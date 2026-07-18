const SearchData = require('../models/SearchData');
const SurplusFood = require('../models/SurplusFood');


const seedDatabase = async () => {
  const count = await SearchData.countDocuments();
  if (count === 0) {
    console.log('Seeding mock data for GlobalSearch MVP...');
    const mockSearchData = [
      {
        title: 'Local News: Mumbai Rains Update',
        snippet: 'Heavy rainfall expected in Mumbai over the next 48 hours. Stay safe and avoid waterlogged areas.',
        url: 'https://example.com/mumbai-rains',
        language: 'English',
        district: 'Mumbai',
        keywords: ['rain', 'weather', 'mumbai', 'news']
      },
      {
        title: 'मुंबई में भारी बारिश की चेतावनी (Mumbai Rain Warning)',
        snippet: 'अगले 48 घंटों में मुंबई में भारी बारिश की संभावना है। सुरक्षित रहें।',
        url: 'https://example.com/mumbai-rains-hindi',
        language: 'Hindi',
        district: 'Mumbai',
        keywords: ['barish', 'mumbai', 'mausam']
      },
      {
        title: 'Delhi Pollution Levels Rise',
        snippet: 'AQI in Delhi reaches severe category. Government advises wearing masks.',
        url: 'https://example.com/delhi-pollution',
        language: 'English',
        district: 'Delhi',
        keywords: ['pollution', 'delhi', 'aqi']
      },
      {
        title: 'Delhi me pollution bohot badh gaya hai',
        snippet: 'AQI severe category me hai, bahar nikalte waqt mask zarur pehne.',
        url: 'https://example.com/delhi-pollution-hinglish',
        language: 'Hinglish',
        district: 'Delhi',
        keywords: ['pollution', 'delhi', 'aqi', 'mask']
      }
    ];

    const mockFoodData = [
      {
        restaurantName: 'The Bombay Canteen',
        items: 'Mixed Veg Curry, Rotis, Rice',
        quantity: 'Serves 20',
        expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000), 
        district: 'Mumbai',
        isClaimed: false
      },
      {
        restaurantName: 'Delhi Heights',
        items: 'Dal Makhani, Naan',
        quantity: 'Serves 15',
        expiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000), 
        district: 'Delhi',
        isClaimed: false
      }
    ];

    await SearchData.insertMany(mockSearchData);
    await SurplusFood.insertMany(mockFoodData);
    console.log('Mock data seeded successfully.');
  }
};


exports.performSearch = async (req, res) => {
  try {
    
    await seedDatabase();

    const { q = '', language = 'English', district = 'All' } = req.query;

    const query = {};

    
    if (q) {
       
       query.$or = [
         { title: { $regex: q, $options: 'i' } },
         { snippet: { $regex: q, $options: 'i' } },
         { keywords: { $regex: q, $options: 'i' } }
       ];
    }

    if (language && language !== 'All') {
      query.language = language;
    }

    if (district && district !== 'All') {
      query.district = district;
    }

    let results = await SearchData.find(query).limit(20);

    
    if (results.length === 0 && q) {
      console.log(`No local results for '${q}'. Fetching from Wikipedia...`);
      try {
        const wikiResponse = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&utf8=&format=json`);
        const wikiData = await wikiResponse.json();
        
        if (wikiData.query && wikiData.query.search) {
          results = wikiData.query.search.map(item => ({
            _id: item.pageid.toString(),
            title: item.title,
            snippet: item.snippet.replace(/<\/?[^>]+(>|$)/g, "") + '...', 
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`,
            language: 'English',
            district: 'Global',
            keywords: [q]
          }));
        }
      } catch (wikiError) {
        console.error('Wikipedia fallback error:', wikiError);
      }
    }

    res.json({ success: true, results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ success: false, message: 'Server Error during search' });
  }
};


exports.getSurplusFood = async (req, res) => {
  try {
    await seedDatabase();
    
    const { district = 'All' } = req.query;
    const query = {
      isClaimed: false,
      expiryTime: { $gt: new Date() } 
    };

    if (district && district !== 'All') {
      query.district = district;
    }

    const foodList = await SurplusFood.find(query).sort({ expiryTime: 1 });
    res.json({ success: true, foodList });
  } catch (error) {
    console.error('Food fetch error:', error);
    res.status(500).json({ success: false, message: 'Server Error fetching food data' });
  }
};


exports.claimFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { ngoName } = req.body;

    if (!ngoName) {
      return res.status(400).json({ success: false, message: 'NGO Name is required to claim food' });
    }

    const foodItem = await SurplusFood.findByIdAndUpdate(
      id,
      { isClaimed: true, claimedByNGO: ngoName },
      { new: true }
    );

    if (!foodItem) {
      return res.status(404).json({ success: false, message: 'Food item not found' });
    }

    res.json({ success: true, message: 'Food claimed successfully', foodItem });
  } catch (error) {
    console.error('Food claim error:', error);
    res.status(500).json({ success: false, message: 'Server Error claiming food' });
  }
};

exports.transliterate = async (req, res) => {
  try {
    const { text = '', langCode = 'hi' } = req.query;
    if (!text) {
      return res.json(['SUCCESS', [[text, [text]]]]);
    }
    
    // Call Google Input Tools API
    const response = await fetch(`https://inputtools.google.com/request?text=${encodeURIComponent(text)}&itc=${langCode}-t-i0-und&num=5&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Transliteration error:', error);
    res.status(500).json(['ERROR']);
  }
};
