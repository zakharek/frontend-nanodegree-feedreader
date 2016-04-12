/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe("");
            });
        });

        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('name are defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe("");
            });
        });
    });

    describe('The menu', function() {
        /* A test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('menu element is hidden', function() {
            expect(menuIsHidden()).toBe(true);
        });

        /* A test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('menu changes visibility on click', function() {
            var $menuIcon = $(".menu-icon-link");

            $menuIcon.click();
            expect(menuIsHidden()).toBe(false);

            $menuIcon.click();
            expect(menuIsHidden()).toBe(true);
        });

        function menuIsHidden() {
            return $('body').hasClass("menu-hidden");
        }
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            $('.feed').empty();
            loadFeed(1, function() {
                done();
            });
        });

        /* A test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        * Remember, loadFeed() is asynchronous so this test will require
        * the use of Jasmine's beforeEach and asynchronous done() function.
        */
        it('are loaded in the container after loadFeed is called', function(done) {
            var entries = $('.feed .entry');

            expect(entries.length).not.toBe(0);
            done();
        });
    });

    describe('New Feed Selection', function() {
        var initialEntryUrl;

        beforeEach(function(done) {

            loadFeed(getNextFeedIndex(), function() {
                initialEntryUrl = $('.entry-link').prop('href');

                loadFeed(getNextFeedIndex(), function() {
                    done();
                });
            });
        });

        /* A test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        it('content is changed', function(done) {
            var newEntryUrl = $('.entry-link').prop('href');

            expect(newEntryUrl).not.toBe(initialEntryUrl);
            done();
        });

        function getNextFeedIndex() {
            var currentFeedName = $(".header-title").eq(0).text(),
                currentFeedIndex = allFeeds.map(function(feed) { return feed.name; }).indexOf(currentFeedName),
                lastFeedIndex = allFeeds.length - 1;

            return currentFeedIndex === lastFeedIndex ? 0 : currentFeedIndex + 1;
        }
    });


} ());
