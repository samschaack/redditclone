#default subs
Sub.create( { name: "pics", description: "post interesting pictures of anything", owner_id: 1 } )
Sub.create( { name: "EarthPorn", description: "post pictures of amazing landscapes!", owner_id: 1 } )
Sub.create( { name: "woahdude", description: "this is a sub for amazing things", owner_id: 1 } )
Sub.create( { name: "space", description: "everything and anything related to space", owner_id: 1 } )
Sub.create( { name: "IAmA", description: "interesting people come on here and answer mostly trite questions posed by the general public", owner_id: 1 } )
Sub.create( { name: "music", description: "post anything music related", owner_id: 1 } )
Sub.create( { name: "science", description: "post anything science related", owner_id: 1 } )
Sub.create( { name: "todayilearned", description: "post something interesting you learned (probably not) today", owner_id: 1 } )
Sub.create( { name: "physics", description: "post anything physics related", owner_id: 1 } )
Sub.create( { name: "webdev", description: "post anything related to the wonderful profession of web development", owner_id: 1 } )
Sub.create( { name: "videos", description: "this sub is for interesting videos", owner_id: 1 } )
Sub.create( { name: "gaming", description: "post anything related to gaming", owner_id: 1 } )

space_id = Sub.find_by_name("space")
pics_id = Sub.find_by_name("pics")
earth_porn_id = Sub.find_by_name("EarthPorn")

#space
Post.create( { title: "Baltic Sea from space", url: "http://i.imgur.com/mMZh5dl.jpg", sub_id: space_id, user_id: 2 } )
Post.create( { title: "President Nixon welcoming the Apollo 11 astronauts back to Earth", url: "http://www.nasa.gov/sites/default/files/ksc-69p-670.jpg", sub_id: space_id, user_id: 2 } )
Post.create( { title: "Hubble Telescope Spies Off-Kilter Halo Around Distant Galaxy", url: "http://www.space.com/images/i/000/040/887/original/halo-galaxy-centaurus-a.jpg?1406234544", sub_id: space_id, user_id: 2 } )

#EarthPorn
Post.create ( { title: "Bryce Canyon by Marco Isler", url: "http://ppcdn.500px.org/77604037/c3d92a4e883a58d8c9790d704cc003274199aeba/2048.jpg", user_id: 1, sub_id: earth_porn_id } )
Post.create ( { title: "The Wanderer. California, USA. Photographed By Paul Rojas. [900 x 600]", url: "http://ppcdn.500px.org/5029960/7d4023e6f2575cf57ae8c95ef01373a92c9cd887/5.jpg", user_id: 1, sub_id: earth_porn_id } )

#pics
Post.create( { title: "Long Abandoned..", url: "http://imgur.com/sqBvwvz.jpg", sub_id: pics_id, user_id: 1 } )
Post.create( { title: "I'd say, right place, right time - for the bird and the photographer..... not so for the fish.", url: "http://i.imgur.com/YfdjRo2.jpg", sub_id: pics_id, user_id: 2 } )
Post.create( { title: "Dublin café at night, oil/digital", url: "http://i.imgur.com/pPzbksB.jpg", sub_id: pics_id, user_id: 2 } )
Post.create( { title: "So I saw Ace Ventura today in London.", url: "http://i.imgur.com/Wqg4C4v.jpg", sub_id: pics_id, user_id: 1 } )
Post.create( { title: "Abandoned railway in Australia", url: "http://i.imgur.com/x4WmhLC.jpg", sub_id: pics_id, user_id: 2 } )
Post.create( { title: "Lightning from above", url: "http://i.imgur.com/POgdsk3.jpg", sub_id: pics_id, user_id: 2 } )
