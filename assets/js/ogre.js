'use strict';

var ogre = (function() {
    /* 'Objects' */
    
    function Article(title, url) {
        this.title = title;
        this.url = url;
        this.content = null;
    }

    Article.prototype.getContent = function(func) {
        if(this.content == null) {
            var self = this;
            libarticle.scrape(this.url,"7c744d39f52cdaffd7bd059e78bac6a3", function(content) {
                    self.content = content;
                    func(content);
                });
        } else {
            func(this.content);
        }
    }

    function TheOnion() { 
        this.feedUrl = "feeds.theonion.com/theonion/daily";
        this.corsProxy = "http://www.corsproxy.com/";
    }
    
    TheOnion.prototype.getArticles = function() {
        return $.ajax({
            type: "GET",
            url: this.corsProxy + this.feedUrl,
            dataType: "xml"
        }).then(this.parseFeed);
    }
    
    TheOnion.prototype.parseFeed = function(data) {
        return $.map($(data).find("item"), function(item) {
            var title = $(item).find("title").text();
            var link = $(item).find("link").text();
            
            return new Article(title, link);
        });
    }
    
    
    function Reddit() { }
    
    Reddit.prototype.getArticles = function(url) {
        return $.getJSON("http://reddit.com" + url + "?limit=100&jsonp=?")
            .then(function(data) {
                return data.data.children.map(function(child) {
                    return new Article(
                        child.data.title,
                        child.data.url);
                });
            });
    }


    function selectRandom(articles, amount) {
        var randomArticles = [];
        for (var i = 0; i < amount; i++) {
            var random = Math.floor(Math.random() * articles.length);
            if (randomArticles.indexOf(articles[random]) == -1) {
                randomArticles.push(articles[random]);
            } else {
                i--;
            }
        } 
        return randomArticles;
    }


    return {
        'Reddit': Reddit,
        'selectRandom': selectRandom,
        'TheOnion': TheOnion
    };
})();