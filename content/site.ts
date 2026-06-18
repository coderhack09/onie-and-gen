import {
  proposalRoleDefinitions,
  proposalRoleIdAliases,
} from "@/content/proposal-roles"

export const siteConfig = {
  couple: {
    bride: "Genevive P. Grilla", //Noenyl Bryle M. Gonzaga
    brideNickname: "Gen", //Ltryl
    groom: "Ronillo C. Solomon", //Ltryl B. Benitez
    groomNickname: "Onie",
    monogram:"/monogram/mono.png" ,//Ltryl
    backgroundMusic:"/background_music/Goodness of God - piano instrumental cover with lyrics.mp3"
  },
  googleAPI:{
    messageForm: "https://docs.google.com/forms/d/e/1FAIpQLScHQG10j9ktbWCEJIDZuggF3aVHq0eYEUG5IVnJS2DGo2p-yw/formResponse",   //done
    message: "https://script.google.com/macros/s/AKfycbw4bSO-qlESMIDh6--8lk7Z0l_eo9GiB6nrFQIJ4A5IMaI5Gu83xxNc7FBB1n-FV1Av6g/exec",  //done
    rsvp: "https://script.google.com/macros/s/AKfycbwDiUwUOUkdL2P_9qVsxsYsy_rdrx8oTJ-ruvvYKxw_7VHvPCbLUJfpj0kUb2b4tG0F/exec",  //done
    guestList: "https://script.google.com/macros/s/AKfycbwQyq79w_c_eGes5-xe2WrUFr_HIo3UGUk3ORmYHh2l4Xagoc4SuwR0aX5exyWYcG_C4Q/exec",  //done
    guestRequest: "https://script.google.com/macros/s/AKfycbzU3TEaSPM3_ERl5sBHJIgtR_GgYRG13j4d1YyLA6if2Z4PtdwqxXVBe0Ex5eqzoXfhUQ/exec",   //done
    entourage: "https://script.google.com/macros/s/AKfycbypsXYcjM4H3PvFyEV0oVh96E1UHKDZ2_o_HNVsHY7T73_aL0WIxX6DOBPwZqLt9ReA3w/exec",  //done
    sponsors: "https://script.google.com/macros/s/AKfycbzlWufdSWejk7OCHqAdJLI2XcVcIM6rT0FQcg5V2xATJ5g-cRRV2-8jTa8qz8333SUCLA/exec",  //done
    proposalResponses: "https://script.google.com/macros/s/AKfycbzcCySLdI8kP7Y_0F8v04oQFfLazBsBcp1v4sSn-NczPvg_Uz7nSE_uRaNvFWNoBpYg/exec", //done
    weddingDetails: "https://script.google.com/macros/s/AKfycbw8tFwnhY0CuZHHuWRieLEgTV335yNj5cWTYSsMeKOL0bM8iOKod3dwgUrn5nJDTFczgw/exec",   //done
////google share 
    googleShare: "https://docs.google.com/spreadsheets/d/1W4eQAqGxrWuwg_g5mWeoy1mgLeRnBJnAbANMd63_CQ4/edit?usp=sharing", 
  },
  wedding: {
    date: "July 18, 2026",
    time: "2:30 PM",
    venue: "Villa Nostra Vita Resort",
    tagline: "are getting married!",
    theme: "Our wedding palette is inspired by timeless elegance and warmth.Motif Colors: Champagne Gold, Soft Beige, Warm Soft Brown",
    motif: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
  },
  proposal: {
    // Use "Maid of Honor" for unmarried, "Matron of Honor" for married
    honorAttendant: "Matron of Honor" as "Matron of Honor" | "Maid of Honor",
    roles: proposalRoleDefinitions,
    roleIdAliases: proposalRoleIdAliases,
  },
  details: {
    rsvp: {
      deadline: "June 20, 2026",
      contact: "Genevive P. Grilla ",
      phone: "+63 956 799 3127",
    },
  },
  contact: {
    bridePhone: "0956 799 3127",
    groomPhone: "0969 014 8936.",
    email: "",
  },
  giftRegistry: {
    QR_1:{
    id: "Gcash",
    src: "/QR/Gcash.png",
    label: "Gcash",
    accountNumber: "GE*****E S. : +63927532 ****",
    },
    // QR_2:{
    // id: "GCash",
    // src: "/QR/pleaseProvideQR.png",
    // label: "GCash",
    // accountNumber: " Please provide QR for the gift registry",
    // }
  },
  ceremony: {
    location: "Villa Nostra Vita Resort",
    venue: "0374 Mitay1, Contreras St., Brgy. Bagong Barrio, Pandi, Bulacan.",
    map: "https://maps.app.goo.gl/PS5b1oxmqm48AgpX8",
    date: "July 18, 2026 ",
    day: "Saturday",
    time: "2:30 PM",
    entourageTime: "1:30 PM",
    guestsTime: "2:00 PM",
    image: "/Details/ceremony.png",
  },
  reception: {
    location: "Villa Nostra Vita Resort",
    venue: "The Cana at Silang, Cavite",
    map: "https://maps.app.goo.gl/g3gEnLMpLo6WqdoTA",
    date: "July 14, 2026 ",
    day: "Tuesday",
    time: "5:30 PM",
    image: ["/Details/reception1.jpg","/Details/reception2.jpg"],
  },
  dressCode: {
      theme: "SEMI-FORMAL",
    colors: "#BBCED5, #B9C3A8, #F3D8C5, #D1C4D4, #ECD8BA, #F4E8D8, #E1DCCF",
    sponsors: {
      male: "Guests are kindly requested to wear attire in any of the shades within our wedding palette.Color pallet and image to be followed. STRICTLY no shorts, maong jeans, t-shirts, or slippers.",
      female: "Guests are kindly requested to wear attire in any of the shades within our wedding palette.Color pallet and image to be followed. STRICTLY no shorts, maong jeans, t-shirts, or slippers.",
      notes: "Your Presence will make our day even more special \n Ninong: Formal Wear : Charcoal Gray suid and Slacks, white long sleeves, and burgundy neckite \n Ninang: Long Dress / Formal Dress Burgundy Long Formal Dress.",
      photo: "/Details/guestAttire.png",
      palette: "#E3D7CB, #D8C6AE, #C8B29B, #AD937C, #8C684E, #A09E85, #B98F65"
    },
    entourage: {
      gents: "Guests are kindly requested to wear attire in any of the shades within our wedding palette.Color pallet and image to be followed. STRICTLY no shorts, maong jeans, t-shirts, or slippers.",
      ladies: "Guests are kindly requested to wear attire in any of the shades within our wedding palette.Color pallet and image to be followed. STRICTLY no shorts, maong jeans, t-shirts, or slippers.",
      notes: "Your Presence will make our day even more special \n Ninong: Formal Wear : Charcoal Gray suid and Slacks, white long sleeves, and burgundy neckite \n Ninang: Long Dress / Formal Dress Burgundy Long Formal Dress.",
      photo: "/Details/guestAttire.png",
      palette: "#E3D7CB, #D8C6AE, #C8B29B, #AD937C, #8C684E, #A09E85, #B98F65"
    },
    guests: {
      gents: "Wear elegant earth-toned attire in shades of beige, taupe, mocha, camel, or light brown. A linen or cotton polo, button-down shirt, or blazer paired with chinos or slacks is perfect. You may add a tie, pocket square, or suspenders for a refined rustic touch.",
      ladies: "Wear flowy dresses in soft, neutral hues such as beige, champagne, nude, taupe, sand, or warm mocha. Choose light, graceful fabrics and simple accessories that reflect timeless elegance and natural beauty.",
      notes: "WE KINDLY ASK OUR GUEST TO WEAR THESE COLORS \n Gentlemen : Long sleeves / suit and slacks \n Ladies : Long Dress / Formal Dress",
      photo: "/Details/guestAttire.png",
      palette: "#E3D7CB, #D8C6AE, #C8B29B, #AD937C, #8C684E, #A09E85, #B98F65"
    },
    note: "We kindly request our guests to dress in attire following our wedding palette."
  },
  narratives: {
    ourStory: `Once upon a signature…

Our story began with a simple signature, one that slowly turned into something magical. He was my financial advisor, and I was there to sign documents. It was July 5, 2021, and we met at the Lobby of the building. Little did we know, that ordinary day would start a story neither of us expected.

I wasn't looking for anything, yet somehow, our connection grew in its own gentle, unexpected way. And then, on June 1, 2022, our story truly began—we became us. We found a love that feels like home.

Our journey wasn't rushed, but perfectly timed. We believe that God brought us together in His own way and season.

With hearts full of gratitude, we step into this new chapter hand in hand, trusting His plan and celebrating a love rooted in faith, patience, and grace.

Today, we choose each other- again and again- and we can't wait to celebrate this new chapter with the people we love most.`,
    groom: `The first time Mark saw Catherine, time seemed to slow down. It was an ordinary day that instantly became unforgettable: one smile, one hello, and suddenly his world had a new center. He didn't have the perfect words ready, but he knew he had met someone who felt like home.

Early conversations turned into late-night talks, sharing dreams, favorite meals, and whispered prayers for a future together. With every small adventure—coffee runs, long drives, quiet walks—Mark found himself choosing her over and over again. He loved how she laughed freely, how she listened with her whole heart, and how her faith steadied him.

There were seasons of distance and long workdays, but every reunion reminded him why he stayed patient: because Catherine was worth every mile and every minute apart. When he finally knelt to ask for her hand, it wasn't a question of "if," only "when can we start forever?"`,
    bride: `Catherine remembers the first time Mark said her name. It was gentle but sure, a kindness that made her feel both seen and safe. In that softness, she found a partner who met her with the same grace she prayed to give.

Mark's steadiness won her heart: the way he showed up, even when schedules were tight, and how he always found lightness in the small things. He celebrated her wins, held space for her worries, and never hesitated to choose "us" in every decision.

Now, as they prepare to say yes before God and the people they love most, Catherine is grateful for the patience, humor, and hope Mark brings to every day. She knows this next chapter is just the start of the love story they get to write together.`,
  },
  colors: {
    primary: "#87AE73",
    secondary: "#F5F5DC",
  },
  playlist: {
    title: "A Playlist from our hearts",
    subtitle: "Songs that have been part of our journey together",
    playlistName: "Onie & Gen Wedding",
    embedUrl:
      "https://open.spotify.com/embed/playlist/5OaUxRae1lojCdDF4pFWkR?utm_source=generator&si=1f60d98bfb9645f0",
    spotifyUrl:
      "https://open.spotify.com/playlist/5OaUxRae1lojCdDF4pFWkR",
  },
  snapShare: {
    googleDriveLink:
      "https://drive.google.com/drive/folders/1Xi8R8Jq5t80bXyWBkd68su0YKIrMxZVp?usp=sharing",
    albumQR: "/QR/AlbumQR.png",
    hashtag: ["#GenHitsOnie"],
    instructions: "Please scan this QR Code and upload the photos and videos you have taken during our wedding reception. We are delighted to see your snaps too!",
  },
}

export const entourage = [
  // Best Man & Maid/Matron of Honor
  { role: "Best Man", name: "Red Casallo" },
  { role: "Matron of Honor", name: "Imeeliza Timpug" },

  // Parents of the Bride
  { role: "Father", name: "Jaime Balajadia (Uncle)", group: "kate-family" },
  { role: "Mother", name: "Eloida Ricohermoso", group: "kate-family" },

  // Parents of the Groom
  { role: "Brother", name: "Perry Ticbaen (Brother)", group: "christian-family" },
  { role: "Mother", name: "Felicitas Ticbaen", group: "christian-family" },

  // Bridesmaids
  { role: "Bridesmaid", name: "Thea Lynn Dela Cruz" },
  { role: "Bridesmaid", name: "Keara Zane A Cariño" },
  { role: "Bridesmaid", name: "Fidnah Gracia Padallan" },
  { role: "Bridesmaid", name: "Lorna Ladisla" },
  { role: "Bridesmaid", name: "Carla Vanessa Tabilin" },
  { role: "Bridesmaid", name: "Romela Tolentino" },
  { role: "Bridesmaid", name: "Emmalyn Lipio" },
  { role: "Bridesmaid", name: "Carmen Pascual" },
  { role: "Bridesmaid", name: "Ciddie Manota" },

  // Groomsmen
  { role: "Groomsman", name: "Noah Alcaria" },
  { role: "Groomsman", name: "Jervin Garcia" },
  { role: "Groomsman", name: "Myric Mateo" },
  { role: "Groomsman", name: "Caughvan Faustino" },
  { role: "Groomsman", name: "Jayson Torquiano" },
  { role: "Groomsman", name: "Jendah Egino" },
  { role: "Groomsman", name: "Vincent Saguinsin" },
  { role: "Groomsman", name: "Frederick Manota" },
  { role: "Groomsman", name: "Emerson Sulit" },

  // Secondary Sponsors
  // Candle Sponsors
  { role: "Bridesmaid", name: "Romela Tolentino", group: "candle" },
  // Cord Sponsors
  { role: "Bridesmaid", name: "Emmalyn Lipio", group: "cord" },

  // Flower Girls and Little Bride
  { role: "Flower Girl", name: "Kirsten Elija Leyson" },
  { role: "Flower Girl", name: "Blake Juan" },
  { role: "Flower Girl", name: "Reign Arastel Rivera" },
  { role: "Little Bride", name: "Paige Yael Ticbaen" },

  // Ring / Coin Bearers
  { role: "Ring Bearer", name: "Khaleb Dwayne M. Beltran" },
  { role: "Coin Bearer", name: "Lucas Rhaiden Beltran" },
  { role: "Ring Bearer", name: "Dean James Ticbaen" },
]

export const principalSponsors = [
  // Paired from provided Male and Female Sponsors (order-based)
  { name: "Mr. Jony Balao", spouse: "Mrs. Conception Balao" },
  { name: "Mr. Cresencio Francisco", spouse: "Dr. Editha Francisco" },
  { name: "Mr. Aurelio Sab-it", spouse: "Mrs. Ester Sab-it" },
  { name: "Mr. Pio McLiing", spouse: "Mrs. Edna Boloma" },
  { name: "Mr. Fabian Dupiano", spouse: "Mrs. Mary Christine Dupiano" },
  { name: "Mr. Roberto Dosdos", spouse: "Mrs. Angelica Dosdos" },
  { name: "Mr. George Sacla", spouse: "Mrs. Minda De Bolt Sacla" },
  { name: "Mr. Elmo Casallo", spouse: "Mrs. Nora Casallo" },
  { name: "Engr. Jimmy Atayoc Sr", spouse: "Mrs. Mercedes Atayoc" },
  { name: "Mr. Tomas Moyongan", spouse: "Mrs. Betty Moyongan" },
  { name: "Mr. Roger Balantin", spouse: "Mrs. Delia Balantin" },
  { name: "Honorable Mayor Roderick Awingan", spouse: "Mrs. ____ Awingan" },
  { name: "Engr Roy Kepes", spouse: "Vice Gove MaryRose Kepes Fongwan" },
  { name: "Mr. Bobos Nestor Fongwan", spouse: "Mrs. Marga Sison" },
  { name: "Mr. Junvic Suguinsin", spouse: "Mrs. Lavenia Inson" },
  { name: "Mr. Salino Dosdos Jr", spouse: "Mrs. Gina Guiang" },
  { name: "Mr. Pampilo Balajadia", spouse: "Mrs. Angelica Balajadia" },
  { name: "Mr. Alan M. Serduar", spouse: "Mrs. Oliva Serduar" },
  { name: "Mr. Miguel Franco", spouse: "Mrs. Angela Balajadia" },
  // Remaining Female Sponsors without paired male
  { name: "Mrs. Carina C. Watanabe", spouse: "" },
  { name: "Mrs. Cecile Palilio", spouse: "" },
  { name: "Mrs. Nida Saguinsin", spouse: "" },
  { name: "Mrs. Araceli Pitogo", spouse: "" },
  { name: "Mrs. Alda Unidad", spouse: "" },
  { name: "Mrs. Reine Bernadeth Bolanos", spouse: "" },
]
