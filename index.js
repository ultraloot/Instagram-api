const Express = require('express');
const app = Express();
const port = process.env.PORT || 3000;
const http = require("http");
const https = require("https");

http.globalAgent.maxSockets = Infinity;
https.globalAgent.maxSockets = Infinity;

const ig = require('instatouch');
const options = {
    // Number of posts to scrape: {int default: 0}
    count: 0,
    mediaType: 'all',
	timeout: 0,
    session: "sessionid=58625554792%3AXkmjkZmi5xf4VP%3A4%3AAYeBWBq7yur8BjrU2DfvVHSOTHW4q30k4i0Am_h1Gg" //add Your Id Here
};



app.get("/", (req, res) => {
    res.setHeader("Cache-Control", "public,max-age=0");
    res.status(200).json({
        YouTube: 'https://youtube.com/technostone',
        webSite: 'https://www.technostone.xyz',
        telegram: 'https://telegram.me/stonechats'
    })
})

    const urlm = req.query.url
    let url = urlm.split('?')[0];
    // const url = "https://www.instagram.com/p/B6FG9x5Js95/"
    res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
          if(url == '' || url == null){
            return res.status(400).send({
              success: false,
              message: "Query Can't Be Empty!",
              creator: "technostoneyt"
            });
          }

                ig.getPostMeta(url, options).then(data =>{
                var itsv = data.items[0].media_type;
                // console.log(data.items[0].video_versions[0].url);
                // res.status(200).send("Here Bro");
                let urld
                if (itsv == 2) {
                    urld = data.items[0].video_versions[0].url;
                }
                if (itsv == 1) {
                    urld = data.items[0].image_versions2.candidates[0].url
                }
                return res.status(200).json({
                        media_type: itsv,
                        code: 200,
                        file: urld
                    })
            }).catch((err) =>
            res.status(400).json({
                code: 400,
                msg: "Something Wrong Invalid Link"}));
    

app.get("/api/ig/get", (req, res) => {
    const user = req.query.user
    var usertest = "rajkumar.parmar"
    res.setHeader("Cache-Control", "public,max-age=3600,s-maxage=30");
          if(user == '' || user == null){
            return res.status(400).send({
              success: false,
              message: "Query Can't Be Empty!",
              creator: "technostoneyt"
            });
          }
    
    try {
        ig.getUserMeta(user, options).then(data => {
            res.status(200).json({
                code: 200,
                data: {
                    profile: data.graphql.user.profile_pic_url,
					profilehd: data.graphql.user.profile_pic_url_hd,
					fullname: data.graphql.user.full_name,
					private: data.graphql.user.is_private,
					verified: data.graphql.user.is_verified,
					bio: data.graphql.user.biography,
					follower: data.graphql.user.edge_followed_by.count,
					following: data.graphql.user.edge_follow.count,
					conneted_fb: data.graphql.user.connected_fb_page,
					videotimeline: data.graphql.user.edge_felix_video_timeline.count,
					timeline: data.graphql.user.edge_owner_to_timeline_media.count,
					savedmedia: data.graphql.user.edge_saved_media.count,
					collections: data.graphql.user.edge_media_collections.count
                }
                
            })
        }).catch((err) =>
        res.status(400).json({
            code: 400,
            msg: "Something Wrong Invalid Link"}));
    } catch (error) {
        
    }
})

app.listen(port, function(){
    console.log("Your App Running on", port);
/* This File Created By TechnoStone.xyz */
});
