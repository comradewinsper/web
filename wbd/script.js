// This function handles the browser's back/forward button clicks
function handlePopstate(event) {
    const app = document.body._x_dataStack[0];
    if (app) {
        app.syncWithHistory(event.state);
    }
}

// This function holds ALL the data and logic for the entire app
function app() {
    return {
        // --- App State ---
        currentPage: 'home',
        currentPost: null,
        scrollPosition: 0,

        // --- Auth State ---
        isAuthReady: false,
        isLoggedIn: false,
        user: null,
        email: '',
        password: '',
        authError: '',

        // --- Chart State ---
        followersChartInstance: null,
        engagementChartInstance: null,

        // --- Blog State ---
        limit: 4,
        allPosts: [
            // Post 1 (Featured)
            {
                slug: 'how-to-build-following-from-scratch',
                category: 'Growth', categoryColor: 'text-green-700',
                title: 'How to Build a Social Media Following From Scratch in 2025',
                excerpt: "It can be daunting to start from zero, but we've compiled the definitive guide to growing your audience with proven strategies that work.",
                image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=450&fit=crop&q=80',
                authorName: 'Jane Doe',
                authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&q=80',
                date: 'June 15, 2025', readTime: '8 min read',
                fullContent: `
                    <p>Starting a social media account from zero followers can feel like shouting into the void. But with the right strategy, you can build a thriving community faster than you think. This guide will walk you through the essential steps to grow your audience from scratch.</p>
                    
                    <h2>1. Define Your Niche and Audience</h2>
                    <p>You cannot be everything to everyone. The first step is to get hyper-specific. Who are you trying to reach? What problem do you solve for them? Your "niche" is the intersection of your passion and your audience's needs.</p>
                    <ul>
                        <li><strong>Bad Niche:</strong> "Food"</li>
                        <li><strong>Good Niche:</strong> "Quick, 30-minute vegan meals for busy professionals"</li>
                    </ul>
                    
                    <h2>2. Optimize Your Profile</h2>
                    <p>Your profile is your digital storefront. It needs to tell new visitors exactly who you are and why they should follow you in seconds.</p>
                    <ul>
                        <li><strong>Profile Picture:</strong> A clear, high-quality headshot (for personal brands) or a clean logo (for businesses).</li>
                        <li><strong>Bio:</strong> Clearly state who you help, how you help them, and a call-to-action (CTA) like "👇 Download my free guide".</li>
                        <li><strong>Link in Bio:</strong> Use a tool like Linktree or Beacons, or link directly to your most important page.</li>
                    </ul>

                    <h2>3. Create Content Pillars</h2>
                    <p>Don't just post randomly. Create 3-5 "content pillars" or themes that you will rotate through. This keeps your content consistent and tells your audience what to expect.</p>
                    <h3>Example Pillars for a Fitness Coach:</h3>
                    <ol>
                        <li>Motivational Tips</li>
                        <li>Quick Workout Tutorials</li>
                        <li>Healthy Recipe Ideas</li>
                        <li>Client Success Stories</li>
                    </ol>
                    
                    <p>By focusing on providing value within these pillars, you'll attract the right people and give them a reason to stay. Consistency is more important than virality when you're just starting out.</p>
                `
            },
            // Post 2 (Sidebar)
            {
                slug: '5-social-media-trends',
                category: 'Strategy', categoryColor: 'text-purple-700',
                title: 'The 5 Social Media Trends to Watch This Year',
                date: 'June 12, 2025', readTime: '5 min read',
                excerpt: 'Stay ahead of the curve with these platform-defining trends.',
                image: 'https://images.unsplash.com/photo-1554629947-334ff61d85dc?w=400&h=250&fit=crop&q=80',
                authorName: 'Admin', authorImage: 'https://placehold.co/40x40/2c2c2c/ffffff?text=W',
                fullContent: '<p>The social media landscape changes fast. Here are the 5 trends you need to know about right now.</p><h2>1. The Rise of AI Influencers</h2><p>Virtual influencers are no longer a novelty. They are becoming mainstream, offering brands a controlled and always-available collaborator. Expect to see more AI-driven personalities in your feed.</p><h2>2. Long-Form Video on All Platforms</h2><p>While short-form video (Reels, TikToks) is still dominant, platforms are pushing longer-form content (10+ minutes) to compete directly with YouTube. This is a huge opportunity for creators who want to build a deeper connection with their audience.</p>'
            },
            // Post 3 (Sidebar)
            {
                slug: 'linkedin-engagement-case-study',
                category: 'Case Study', categoryColor: 'text-pink-700',
                title: 'How We Doubled Our LinkedIn Engagement in 30 Days',
                date: 'June 10, 2025', readTime: '6 min read',
                excerpt: 'A deep dive into the simple strategy that yielded huge results.',
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop&q=80',
                authorName: 'Alex Smith', authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&q=80',
                fullContent: '<p>LinkedIn is a powerful platform, but engagement can be tough. We ran a 30-day experiment that doubled our average likes and comments. Here\'s the exact formula.</p><h3>The Strategy:</h3><ul><li>Post 1x per day (10 AM ET)</li><li>Rotate post types: Text-only (Mon), Image (Tue), Carousel (Wed), Text-only (Thu), Poll (Fri)</li><li>Comment on 10 other posts in our niche *before* posting</li><li>Reply to every single comment on our own posts within the first hour</li></ul><p>The biggest lever? Engaging with others *before* posting. This "warned up" the algorithm and put our content in front of more people.</p>'
            },
            // Post 4 (Sidebar)
            {
                slug: 'new-ai-assistant',
                category: 'News', categoryColor: 'text-sky-700',
                title: "WBD's New AI Assistant is Here to Help You Create",
                date: 'June 8, 2025', readTime: '4 min read',
                excerpt: 'Meet your new creative partner, built right into WBD.',
                image: 'https://images.unsplash.com/photo-1620712943543-26fc9ee563b0?w=400&h=250&fit=crop&q=80',
                authorName: 'Admin', authorImage: 'https://placehold.co/40x40/2c2c2c/ffffff?text=W',
                fullContent: '<p>We are thrilled to announce the launch of the new WBD AI Assistant. Now, you can generate post ideas, write drafts, repurpose content, and even brainstorm hooks with the click of a button.</p><h2>What can it do?</h2><ul><li>Generate 5 post ideas from a single topic</li><li>Rewrite your content in a different tone (e.g., professional, witty, empathetic)</li><li>Summarize a long article into a short, punchy tweet thread</li><li>Brainstorm a list of 10 catchy hooks for your next video</li></ul>'
            },
            // Post 5 (Loaded)
            {
                slug: 'introducing-content-queues',
                category: 'Product', categoryColor: 'text-blue-600',
                title: 'Introducing Content Queues: Never Run Out of Things to Post',
                excerpt: 'Automate your evergreen content and keep your social feeds active even when you take a break.',
                image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&h=250&fit=crop&q=80',
                authorName: 'Jane Doe', authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&q=80',
                date: 'June 5, 2025', readTime: '3 min read',
                fullContent: '<p>Content Queues are here! This new feature allows you to create buckets of evergreen content (like blog posts, tips, or quotes) and set a schedule. WBD will automatically pull from that queue to fill gaps in your calendar. It\'s the perfect way to stay consistent, even when you\'re busy.</p>'
            },
            // Post 6 (Loaded)
            {
                slug: '10-ways-to-repurpose-content',
                category: 'Tips', categoryColor: 'text-green-600',
                title: '10 creative ways to repurpose your long-form content',
                excerpt: 'Turn one blog post into a month worth of social media content with these simple frameworks.',
                image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop&q=80',
                authorName: 'Alex Smith', authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&q=80',
                date: 'June 2, 2025', readTime: '6 min read',
                fullContent: '<p>Stop creating content from scratch every day. Take one piece of long-form content (like this blog post) and repurpose it.</p><h3>1 Blog Post can become:</h3><ul><li>10 quote graphics for Instagram</li><li>1 Twitter thread summarizing the key points</li><li>1 LinkedIn text post on the main takeaway</li><li>1 short video script for a Reel/TikTok</li><li>5 questions for your audience</li></ul><p>Work smarter, not harder.</p>'
            },
            // Post 7 (Loaded)
            {
                slug: 'why-authenticity-is-new-viral',
                category: 'Industry', categoryColor: 'text-purple-600',
                title: 'Why "Authenticity" is the new viral metric',
                excerpt: 'Users are tired of perfectly polished feeds. Here is why raw, unfiltered content is winning in 2025.',
                image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=250&fit=crop&q=80',
                authorName: 'Jane Doe', authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&q=80',
                date: 'May 28, 2025', readTime: '5 min read',
                fullContent: '<p>Forget perfect lighting and scripted videos. Audiences in 2025 are craving one thing: authenticity. Behind-the-scenes content, unfiltered thoughts, and even public "failures" are building stronger connections than polished, professional content ever did. People want to connect with other people, not a flawless brand.</p>'
            },
            // Post 8 (Loaded)
            {
                slug: 'anatomy-of-perfect-linkedin-post',
                category: 'Growth', categoryColor: 'text-orange-600',
                title: 'The Anatomy of a Perfect LinkedIn Post',
                excerpt: 'We analyzed 10,000 viral LinkedIn posts to find the common elements that drive massive engagement.',
                image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=250&fit=crop&q=80',
                authorName: 'Alex Smith', authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&q=80',
                date: 'May 20, 2025', readTime: '8 min read',
                fullContent: '<p>After analyzing 10,000 top-performing posts, we found a clear pattern.</p><h3>The Viral Formula:</h3><ul><li><b>The Hook:</b> A strong, 1-2 line opener that creates curiosity.</li><li><b>The Body:</b> 3-5 short paragraphs, separated by white space. Use lists or bullet points.</li><li><b>The Conclusion:</b> A clear takeaway for the reader.</li><li><b>The CTA:</b> A specific question to the audience.</li></ul><p>That\'s it. Stop overthinking it.</p>'
            },
            // Post 9 (Loaded)
            {
                slug: 'instagram-algorithm-update',
                category: 'News', categoryColor: 'text-red-600',
                title: 'Platform Update: Instagram Changes Algorithm Again',
                excerpt: 'Here is everything you need to know about the latest changes and how to adjust your strategy today.',
                image: 'https.images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop&q=80',
                authorName: 'Admin', authorImage: 'https://placehold.co/40x40/2c2c2c/ffffff?text=W',
                date: 'May 15, 2025', readTime: '4 min read',
                fullContent: '<p>Instagram just announced another shift in its algorithm. The platform will now be prioritizing "original content" more than ever. This means posts that are created directly in the app (or are not detected as re-uploads from other platforms like TikTok) will get significantly more reach. They are also deprioritizing accounts that "recycle" content too frequently.</p>'
            },
            // Post 10 (Loaded)
            {
                slug: 'local-coffee-case-study',
                category: 'Case Study', categoryColor: 'text-pink-600',
                title: 'How Local Coffee Co. reached 50k followers without ads',
                excerpt: 'A deep dive into the organic strategy that put this small business on the global map.',
                image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop&q=80',
                authorName: 'Jane Doe', authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&q=80',
                date: 'May 10, 2025', readTime: '7 min read',
                fullContent: '<p>Local Coffee Co. went from a single shop with 200 followers to a 50k-follower brand in just 6 months. How? By focusing 100% on user-generated content (UGC). Instead of posting polished photos, their entire feed is made up of customer photos. They run a weekly "photo of the week" contest, and the winner gets a free coffee. This simple, community-focused loop built an army of advocates and gave them an endless supply of authentic content.</p>'
            }
        ],

        // --- Dashboard State ---
        platforms: [
            { id: 'google.com', name: 'Google', icon: 'fab fa-google', color: 'text-red-500' },
            { id: 'facebook.com', name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
            { id: 'instagram.com', name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
            { id: 'twitter.com', name: 'X (Twitter)', icon: 'fab fa-twitter', color: 'text-black' },
        ],
        connectedAccounts: {},
        firebaseProviders: {}, // This will be filled in init()

        // --- Create Post State ---
        newPostText: '',
        selectedAccounts: [],


        // --- App Initialization ---
        init() {
            try {
                if (window.firebase && firebase.app) { // Check if firebase is loaded
                    if (!firebase.apps.length) {
                        firebase.initializeApp(window.firebaseConfig);
                    }
                    // This is your NEW (fixed) code
                    this.firebaseProviders = {
                        'google.com': new firebase.auth.GoogleAuthProvider(),
                        'facebook.com': new firebase.auth.FacebookAuthProvider(),
                        'twitter.com': new firebase.auth.TwitterAuthProvider(),
                        'instagram.com': new firebase.auth.FacebookAuthProvider() // <-- ADD THIS LINE
                    };

                    firebase.auth().onAuthStateChanged((user) => {
                        if (user) {
                            this.user = user;
                            this.isLoggedIn = true;
                            this.updateConnectedAccounts(user);
                            if (this.currentPage === 'home' || this.currentPage === 'login' || this.currentPage === 'signup') {
                                this.currentPage = 'dashboard';
                            }
                        } else {
                            this.user = null;
                            this.isLoggedIn = false;
                            if (this.currentPage === 'dashboard') {
                                this.currentPage = 'home';
                            }
                        }
                        this.isAuthReady = true;
                        this.email = '';
                        this.password = '';
                        this.authError = '';
                    });

                } else {
                    console.error("Firebase scripts are not loaded correctly.");
                    this.isAuthReady = true;
                    return;
                }
            } catch (e) {
                console.error("Firebase initialization error:", e);
                this.isAuthReady = true;
            }

            const hash = window.location.hash.substring(1);
            this.syncWithUrl(hash, true);

            this.$watch('currentPage', (newPage) => {
                if (!this.currentPost) {
                    this.updateHistory(newPage, null, 0);
                }

                if (newPage === 'analyze') {
                    this.$nextTick(() => { this.initAnalyticsCharts(); });
                } else {
                    this.destroyAnalyticsCharts();
                }
            });
        },

        // --- History & URL Methods ---

        syncWithHistory(state) {
            if (!state) {
                this.currentPage = 'home';
                this.currentPost = null;
                return;
            }

            if (this.isLoggedIn && state.page === 'home') {
                this.currentPage = 'dashboard';
                this.currentPost = null;
                return;
            }

            this.currentPage = state.page;

            if (state.postSlug) {
                const post = this.allPosts.find(p => p.slug === state.postSlug);
                if (post) { this.currentPost = post; }
            } else {
                this.currentPost = null;
                this.$nextTick(() => {
                    window.scrollTo({ top: state.scroll || 0, behavior: 'auto' });
                });
            }
        },

        syncWithUrl(hash, replace = false) {
            let page = 'home';
            let postSlug = null;

            if (hash.startsWith('blog/')) {
                page = 'blog';
                postSlug = hash.replace('blog/', '');
            } else if (['home', 'create', 'publish', 'analyze', 'engage', 'pricing', 'blog', 'login', 'signup', 'contentLibrary', 'helpCenter', 'status', 'about', 'careers', 'salaryData', 'revenue', 'dashboard'].includes(hash)) {
                page = hash;
            }

            if (this.isLoggedIn && page === 'home') {
                this.currentPage = 'dashboard';
            } else {
                this.currentPage = page;
            }

            if (postSlug) {
                const post = this.allPosts.find(p => p.slug === postSlug);
                if (post) this.currentPost = post;
            } else if (page === 'analyze') {
                this.$nextTick(() => {
                    this.initAnalyticsCharts();
                });
            }

            let correctHash = this.currentPage;
            if (this.currentPost) {
                correctHash = `blog/${this.currentPost.slug}`;
            }

            if (replace) {
                window.history.replaceState({ page: this.currentPage, postSlug: this.currentPost?.slug, scroll: 0 }, '', `#${correctHash}`);
            }
        },

        updateHistory(page, postSlug, scroll = 0) {
            const state = { page, postSlug, scroll };
            let hash = page;
            if (postSlug) {
                hash = `blog/${postSlug}`;
            }

            if (window.history.state?.page !== page || window.history.state?.postSlug !== postSlug) {
                window.history.pushState(state, '', `#${hash}`);
            }
        },

        // --- Auth Methods ---
        handleLogin() {
            this.authError = '';
            if (!this.email || !this.password) {
                this.authError = 'Please enter both email and password.';
                return;
            }

            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    // onAuthStateChanged will handle the redirect
                })
                .catch((error) => {
                    this.authError = this.getFriendlyAuthError(error.code);
                });
        },

        handleSignup() {
            this.authError = '';
            if (!this.email || !this.password) {
                this.authError = 'Please enter both email and password.';
                return;
            }

            firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((userCredential) => {
                    // onAuthStateChanged will handle the redirect
                })
                .catch((error) => {
                    this.authError = this.getFriendlyAuthError(error.code);
                });
        },

        handleLogout() {
            firebase.auth().signOut().catch((error) => {
                console.error("Logout error:", error);
            });
        },

        getFriendlyAuthError(code) {
            switch (code) {
                case 'auth/invalid-email':
                    return 'Please enter a valid email address.';
                case 'auth/user-not-found':
                    return 'No account found with this email.';
                case 'auth/wrong-password':
                    return 'Incorrect password. Please try again.';
                case 'auth/email-already-in-use':
                    return 'This email is already in use by another account.';
                case 'auth/weak-password':
                    return 'Password should be at least 6 characters long.';
                case 'auth/popup-closed-by-user':
                    return 'Popup closed. Please try again.';
                case 'auth/account-exists-with-different-credential':
                    return 'An account already exists with this email, but with a different login method (e.g., Google).';
                default:
                    return 'An unexpected error occurred. Please try again.';
            }
        },

        // --- Chart Methods ---
        initAnalyticsCharts() {
            this.destroyAnalyticsCharts();

            const followersData = {
                labels: ['May 1', 'May 8', 'May 15', 'May 22', 'May 29', 'June 5', 'Today'],
                datasets: [{
                    label: 'Total Followers',
                    data: [7800, 7950, 8100, 8050, 8300, 8750, 8944],
                    fill: false,
                    borderColor: 'rgb(2, 132, 199)', // sky-600
                    tension: 0.1
                }]
            };

            if (this.$refs.followersChart) {
                this.followersChartInstance = new Chart(this.$refs.followersChart.getContext('2d'), {
                    type: 'line',
                    data: followersData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: { beginAtZero: false }
                        }
                    }
                });
            }

            const engagementData = {
                labels: ['Likes', 'Comments', 'Shares', 'Saves'],
                datasets: [{
                    label: 'Engagement by Type',
                    data: [1200, 350, 180, 420],
                    backgroundColor: [
                        'rgb(59, 130, 246)', // blue-500
                        'rgb(16, 185, 129)', // green-500
                        'rgb(168, 85, 247)', // purple-500
                        'rgb(245, 158, 11)'  // amber-500
                    ],
                    hoverOffset: 4
                }]
            };

            if (this.$refs.engagementChart) {
                this.engagementChartInstance = new Chart(this.$refs.engagementChart.getContext('2d'), {
                    type: 'doughnut',
                    data: engagementData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    }
                });
            }
        },

        destroyAnalyticsCharts() {
            if (this.followersChartInstance) {
                this.followersChartInstance.destroy();
                this.followersChartInstance = null;
            }
            if (this.engagementChartInstance) {
                this.engagementChartInstance.destroy();
                this.engagementChartInstance = null;
            }
        },

        // --- Blog Methods ---
        loadMore() {
            this.limit += 3;
        },

        get hasMore() {
            return this.limit < this.allPosts.length;
        },

        readPost(slug) {
            const post = this.allPosts.find(p => p.slug === slug);
            if (post) {
                this.scrollPosition = window.scrollY; // Save position
                this.currentPost = post;
                this.updateHistory('blog', slug); // Update URL
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        },

        closePost() {
            this.updateHistory('blog', null, this.scrollPosition);
            this.currentPost = null;

            this.$nextTick(() => {
                window.scrollTo({ top: this.scrollPosition, behavior: 'auto' });
            });
        },

        // --- Dashboard Methods ---

        updateConnectedAccounts(user) {
            let connected = {};
            user.providerData.forEach((provider) => {
                connected[provider.providerId] = true;
            });
            this.connectedAccounts = connected;
        },

        connectAccount(platformId) {
            const provider = this.firebaseProviders[platformId];
            if (!provider) {
                alert(`Connection for ${platformId} is not configured yet.`);
                return;
            }

            firebase.auth().currentUser
                .linkWithPopup(provider)
                .then((result) => {
                    this.user = result.user;
                    this.updateConnectedAccounts(result.user);
                    alert(`Successfully connected ${platformId}!`);
                })
                .catch((error) => {
                    console.error("Firebase Connect Error:", error); // <-- ADD THIS LINE
                    alert(`Error: ${this.getFriendlyAuthError(error.code)}`);
                });
        },

        disconnectAccount(platformId) {
            if (!confirm(`Are you sure you want to disconnect ${platformId}?`)) {
                return;
            }

            firebase.auth().currentUser
                .unlink(platformId)
                .then((user) => {
                    this.user = user;
                    this.updateConnectedAccounts(user);
                    alert(`Successfully disconnected ${platformId}.`);
                })
                .catch((error) => {
                    alert(`Error: ${error.message}`);
                });
        },

        // --- Create Post Methods ---
        schedulePost() {
            if (!this.newPostText) {
                alert('Please write something in your post.');
                return;
            }
            if (this.selectedAccounts.length === 0) {
                alert('Please select at least one account to post to.');
                return;
            }

            // In a real app, we would open a scheduler modal.
            // For now, we just show a confirmation.
            alert(`Post successfully scheduled for: ${this.selectedAccounts.join(', ')}\n\nPost: ${this.newPostText}`);

            // Reset the form
            this.newPostText = '';
            this.selectedAccounts = [];
        },

        postNow() {
            if (!this.newPostText) {
                alert('Please write something in your post.');
                return;
            }
            if (this.selectedAccounts.length === 0) {
                alert('Please select at least one account to post to.');
                return;
            }

            // In a real app, this would trigger the backend API call.
            // For now, we just show a confirmation.
            alert(`Posting now to: ${this.selectedAccounts.join(', ')}\n\nPost: ${this.newPostText}`);

            // Reset the form
            this.newPostText = '';
            this.selectedAccounts = [];
        }
    };
}

// This part registers the platformSlider, which is separate
document.addEventListener('alpine:init', () => {
    // This adds the app() function so the <body> tag can use it
    Alpine.data('app', app);

    // This adds the platformSlider for the homepage
    Alpine.data('platformSlider', () => ({
        platformSliderPlatforms: [ // Renamed to avoid conflict
            { name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
            { name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-500' },
            { name: 'LinkedIn', icon: 'fab fa-linkedin', color: 'text-blue-700' },
            { name: 'TikTok', icon: 'fab fa-tiktok', color: 'text-black' },
            { name: 'Pinterest', icon: 'fab fa-pinterest', color: 'text-red-600' },
            { name: 'Twitter', icon: 'fab fa-twitter', color: 'text-sky-500' },
            { name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-600' },
            { name: 'Mastodon', icon: 'fab fa-mastodon', color: 'text-purple-600' }
        ],
        currentPlatformIndex: 0,
        init() {
            if (!window.platformInterval) {
                window.platformInterval = setInterval(() => {
                    this.currentPlatformIndex = (this.currentPlatformIndex + 1) % this.platformSliderPlatforms.length;
                }, 2500);
            }
        }
    }));
});