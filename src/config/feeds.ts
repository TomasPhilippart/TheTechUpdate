type Feed = {
  name: string;
  url: string;
  options?: {
    showSummary?: boolean;
  };
};

type FeedCategory = {
  name: string;
  feeds: Feed[];
};

export const feedCategories: FeedCategory[] = [
  {
    name: "Tech News",
    feeds: [
  {
    name: "Hacker News",
    url: "https://hnrss.org/frontpage",
    options: {
      showSummary: false
    }
  },
  {
    name: "The Verge",
    url: "https://www.theverge.com/rss/index.xml",
  },
  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },
  {
    name: "ArsTechnica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
  },
  {
    name: "The Register",
    url: "https://www.theregister.com/headlines.atom",
  },
  {
    name: "Phoronix",
    url: "https://www.phoronix.com/rss.php",
  },
  {
    name: "Wired",
    url: "https://www.wired.com/feed/rss",
      },
    ]
  },
  {
    name: "Startup",
    feeds: [
      {
        name: "Startups – TechCrunch",
        url: "https://techcrunch.com/startups/feed/",
      },
      {
        name: "First Round Review",
        url: "http://firstround.com/review/feed.xml",
      },
      {
        name: "Steve Blank",
        url: "http://steveblank.com/feed/",
      },
      {
        name: "Sam Altman",
        url: "http://blog.samaltman.com/posts.atom",
      },
      {
        name: "George Hotz - The singularity is nearer",
        url: "https://geohot.github.io/blog/feed.xml",
      },
      {
        name: "Guy Kawasaki",
        url: "http://guykawasaki.com/feed/",
      },
      {
        name: "Essays - Benedict Evans",
        url: "http://ben-evans.com/benedictevans?format=rss",
      },
      {
        name: "Andrew Chen",
        url: "http://andrewchen.co/feed/",
      },
      {
        name: "Both Sides of the Table",
        url: "http://feeds.feedburner.com/BothSidesOfTheTable",
      },
      {
        name: "The Black Box of Product Management",
        url: "https://medium.com/feed/the-black-box-of-product-management",
      },
      {
        name: "Product Life",
        url: "https://productlife.to/feed",
      },
      {
        name: "Irrational Exuberance",
        url: "https://lethain.com/feeds/",
      },
    ]
  },
  {
    name: "Engineering",
    feeds: [
      {
        name: "GitHub Engineering",
        url: "http://githubengineering.com/atom.xml",
      },
      {
        name: "Slack Engineering",
        url: "https://slack.engineering/feed",
      },
      {
        name: "Spotify Engineering",
        url: "https://engineering.atspotify.com/feed/",
      },
      {
        name: "The Pragmatic Engineer",
        url: "https://blog.pragmaticengineer.com/rss/",
      },
      {
        name: "The Airtable Engineering Blog",
        url: "https://medium.com/feed/airtable-eng",
      },
      {
        name: "Medium Engineering",
        url: "https://medium.com/feed/medium-eng",
      },
      {
        name: "The PayPal Technology Blog",
        url: "https://medium.com/feed/paypal-engineering",
      },
      {
        name: "Pinterest Engineering Blog",
        url: "https://medium.com/feed/pinterest-engineering",
      },
      {
        name: "Grab Tech",
        url: "https://engineering.grab.com/feed.xml",
      },
      {
        name: "Facebook Engineering",
        url: "https://code.facebook.com/posts/rss",
      },
      {
        name: "eBay Tech Blog",
        url: "http://www.ebaytechblog.com/feed/",
      },
      {
        name: "Twitter Engineering",
        url: "https://blog.twitter.com/engineering/en_us/blog.rss",
      },
      {
        name: "Stripe Blog",
        url: "https://stripe.com/blog/feed.rss",
      },
      {
        name: "Instagram Engineering",
        url: "https://instagram-engineering.com/feed",
      },
      {
        name: "The Cloudflare Blog",
        url: "https://blog.cloudflare.com/rss/",
      },
      {
        name: "Engineering – The Asana Blog",
        url: "https://blog.asana.com/category/eng/feed/",
      },
      {
        name: "The Airbnb Tech Blog",
        url: "https://medium.com/feed/airbnb-engineering",
      },
      {
        name: "Dropbox Tech",
        url: "https://dropbox.tech/feed",
      },
      {
        name: "Web Browser Engineering",
        url: "https://browser.engineering/rss.xml",
      },
      {
        name: "Engineering at Meta",
        url: "https://engineering.fb.com/feed/",
      },
      {
        name: "Mind the Product",
        url: "https://www.mindtheproduct.com/feed/",
      },
      {
        name: "Julia Evans",
        url: "https://jvns.ca/atom.xml",
      },
      {
        name: "Martin Kleppmann's blog",
        url: "https://feeds.feedburner.com/martinkl?format=xml",
      },
      {
        name: "Dan Abramov's Overreacted Blog",
        url: "https://overreacted.io/rss.xml",
      },
      {
        name: "Dan Luu",
        url: "https://danluu.com/atom.xml",
      },
      {
        name: "Shopify Engineering",
        url: "https://shopifyengineering.myshopify.com/blogs/engineering.atom",
      },
      {
        name: "Josh Comeau's blog",
        url: "https://joshwcomeau.com/rss.xml",
      },
      {
        name: "Sophie Alpert",
        url: "https://sophiebits.com/atom.xml",
      },
      {
        name: "Amjad Masad",
        url: "https://amasad.me/rss",
      },
      {
        name: "Signal Blog",
        url: "https://signal.org/blog/rss.xml",
      },
      {
        name: "Joel on Software",
        url: "https://www.joelonsoftware.com/feed/",
      },
    ]
  },
  {
    name: "Machine Learning",
    feeds: [
      {
        name: "OpenAI",
        url: "https://blog.openai.com/rss/",
      },
      {
        name: "Google AI Blog",
        url: "http://googleresearch.blogspot.com/atom.xml",
      },
      {
        name: "DeepMind",
        url: "https://deepmind.com/blog/feed/basic/",
      },
      {
        name: "Machine Learning Blog | ML@CMU",
        url: "https://blog.ml.cmu.edu/feed/",
      },
      {
        name: "Jay Alammar",
        url: "https://jalammar.github.io/feed.xml",
      },
      {
        name: "Distill",
        url: "http://distill.pub/rss.xml",
      },
      {
        name: "Lil'Log",
        url: "https://lilianweng.github.io/lil-log/feed.xml",
      },
      {
        name: "MIT News - Artificial intelligence",
        url: "http://news.mit.edu/rss/topic/artificial-intelligence2",
      },
      {
        name: "Sebastian Ruder",
        url: "http://ruder.io/rss/index.rss",
      },
      {
        name: "The Berkeley Artificial Intelligence Research Blog",
        url: "http://bair.berkeley.edu/blog/feed.xml",
      },
      {
        name: "DeepLearningAI",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCcIXc5mJsHVYTZR1maL5l9w",
      },
      {
        name: "Eric Jang",
        url: "http://blog.evjang.com/feeds/posts/default?alt=rss",
      },
      {
        name: "The Gradient",
        url: "https://thegradient.pub/rss/",
      },
      {
        name: "Magenta",
        url: "http://magenta.tensorflow.org/feed.xml",
      },
      {
        name: "NLP News",
        url: "http://newsletter.ruder.io/?format=rss",
      },
      {
        name: "Towards Data Science",
        url: "https://towardsdatascience.com/feed",
      },
      {
        name: "Unite.AI",
        url: "https://www.unite.ai/feed/",
      },
      {
        name: "Grammarly Blog",
        url: "https://www.grammarly.com/blog/feed/",
      },
      {
        name: "Eric Jang (alternative)",
        url: "https://evjang.com/feed",
      },
      {
        name: "Amazon Science Homepage",
        url: "https://www.amazon.science/index.rss",
      },
      {
        name: "Machine Learning Reddit",
        url: "http://www.reddit.com/r/MachineLearning/.rss",
      },
      {
        name: "Yannic Kilcher",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCZHmQk67mSJgfCCTn7xBfew",
      },
      {
        name: "Two Minute Papers",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg",
      },
    ]
  },
  {
    name: "Learning",
    feeds: [
      {
        name: "The Decision Lab",
        url: "https://thedecisionlab.com/feed/",
      },
      {
        name: "Ness Labs",
        url: "https://nesslabs.com/feed",
      },
      {
        name: "Farnam Street",
        url: "https://fs.blog/feed/",
      },
      {
        name: "The Sunday Wisdom",
        url: "https://coffeeandjunk.substack.com/feed",
      },
      {
        name: "Commonplace - The Commoncog Blog",
        url: "https://commoncog.com/blog/rss/",
      },
      {
        name: "Scott H Young",
        url: "https://feeds.feedburner.com/scotthyoung/HAHx",
      },
      {
        name: "Big Think",
        url: "https://feeds.feedburner.com/bigthink/main",
      },
    ]
  },
  {
    name: "Products & Ideas",
    feeds: [
      {
        name: "Product Hunt",
        url: "http://www.producthunt.com/feed",
      },
      {
        name: "Hacker News: Show HN",
        url: "http://hnrss.org/show",
      },
      {
        name: "Hacker News: Launches",
        url: "https://hnrss.org/launches",
      },
      {
        name: "Sachin Rekhi's Blog",
        url: "http://feeds.feedburner.com/sachinrekhiblog",
      },
    ]
  },
  {
    name: "Design",
    feeds: [
      {
        name: "UX Planet",
        url: "https://uxplanet.org/feed",
      },
      {
        name: "NN/g latest articles",
        url: "https://www.nngroup.com/feed/rss/",
      },
      {
        name: "UX Movement",
        url: "http://feeds.feedburner.com/uxmovement",
      },
      {
        name: "Inside Design",
        url: "http://blog.invisionapp.com/feed/",
      },
      {
        name: "UXmatters",
        url: "https://uxmatters.com/index.xml",
      },
      {
        name: "Smashing Magazine",
        url: "https://www.smashingmagazine.com/feed/",
      },
      {
        name: "UX Collective",
        url: "https://uxdesign.cc/feed",
      },
      {
        name: "Airbnb Design",
        url: "http://airbnb.design/feed/",
      },
      {
        name: "web.dev",
        url: "https://web.dev/feed.xml",
      },
      {
        name: "Slack Design",
        url: "https://slack.design/feed/",
      },
      {
        name: "CSS-Tricks",
        url: "https://feeds.feedburner.com/CssTricks",
      },
      {
        name: "UX Daily",
        url: "https://interaction-design.org/rss/site_news.xml",
      },
    ]
  },
  {
    name: "Psychology",
    feeds: [
      {
        name: "PsyBlog",
        url: "http://feeds.feedburner.com/PsychologyBlog",
      },
      {
        name: "Psychology Blog",
        url: "http://www.all-about-psychology.com/psychology.xml",
      },
      {
        name: "Psychology Headlines Around the World",
        url: "http://www.socialpsychology.org/headlines.rss",
      },
      {
        name: "Nautilus",
        url: "https://nautil.us/rss/all",
      },
      {
        name: "Freakonomics",
        url: "http://freakonomics.blogs.nytimes.com/feed/",
      },
      {
        name: "Psychology Today",
        url: "https://www.psychologytoday.com/intl/rss.xml",
      },
    ]
  },
  {
    name: "Neuroscience",
    feeds: [
      {
        name: "Neuroscience News",
        url: "http://neurosciencenews.com/feed/",
      },
      {
        name: "Neuroscience News -- ScienceDaily",
        url: "https://sciencedaily.com/rss/mind_brain/neuroscience.xml",
      },
      {
        name: "SharpBrains",
        url: "http://www.sharpbrains.com/feed/",
      },
    ]
  },
  {
    name: "Science",
    feeds: [
      {
        name: "Nautilus",
        url: "http://nautil.us/rss/all",
      },
      {
        name: "Quanta Magazine",
        url: "http://www.quantamagazine.org/feed/",
      },
      {
        name: "Nature",
        url: "http://www.nature.com/nature/current_issue/rss",
      },
      {
        name: "MIT News - Science and Technology",
        url: "https://news.mit.edu/rss/topic/science-technology-and-society",
      },
      {
        name: "MIT News",
        url: "https://news.mit.edu/rss/research",
      },
      {
        name: "ScienceAlert",
        url: "https://www.sciencealert.com/rss",
      },
      {
        name: "Singularity Hub",
        url: "https://singularityhub.com/feed/",
      },
      {
        name: "Lesics",
        url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCqZQJ4600a9wIfMPbYc60OQ",
      },
    ]
  },
  {
    name: "Marketing",
    feeds: [
      {
        name: "Moz",
        url: "http://feeds.feedburner.com/seomoz",
      },
      {
        name: "Content Marketing Institute",
        url: "http://feeds.feedburner.com/cmi-content-marketing",
      },
      {
        name: "Neil Patel",
        url: "http://feeds.feedburner.com/KISSmetrics",
      },
      {
        name: "MarketingProfs",
        url: "http://rss.marketingprofs.com/marketingprofs/daily",
      },
      {
        name: "Marketo Marketing blog",
        url: "http://feeds.feedburner.com/modernb2bmarketing",
      },
      {
        name: "Quick Sprout",
        url: "http://www.quicksprout.com/feed/",
      },
      {
        name: "Social Media Examiner",
        url: "http://www.socialmediaexaminer.com/feed/",
      },
      {
        name: "John Egan",
        url: "http://jwegan.com/feed/rss/",
      },
      {
        name: "Convince and Convert",
        url: "http://www.convinceandconvert.com/feed/",
      },
      {
        name: "Hubspot",
        url: "http://blog.hubspot.com/CMS/UI/Modules/BizBlogger/rss.aspx?tabid=6307&moduleid=8441&maxcount=25",
      },
      {
        name: "Seth Godin's Blog",
        url: "http://sethgodin.typepad.com/seths_blog/atom.xml",
      },
      {
        name: "Backlinko",
        url: "http://backlinko.com/feed",
      },
    ]
  },
  {
    name: "Others",
    feeds: [
      {
        name: "TED Talks Daily",
        url: "http://feeds.feedburner.com/tedtalks_video",
      },
      {
        name: "HBR.org",
        url: "http://feeds.harvardbusiness.org/harvardbusiness/",
      },
    ]
  },
];

// For backward compatibility
export const feeds = feedCategories.flatMap(category => category.feeds); 