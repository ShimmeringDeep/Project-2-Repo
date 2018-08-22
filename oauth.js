var ids = {
    facebook: {
      clientID: process.env.SF1_KEY,
      clientSecret: process.env.SF2_KEY,
      callbackURL: process.env.SF3_KEY,
    },
    twitter: {
      consumerKey: process.env.ST1_KEY,
      consumerSecret: process.env.ST2_KEY,
      callbackURL: process.env.ST3_KEY
    },
    github: {
      clientID: process.env.SGIT1_KEY,
      clientSecret: process.env.SGIT2_KEY,
      callbackURL: process.env.SGIT3_KEY,
    },
    google: {
      clientID: process.env.SG1_KEY,
      clientSecret: process.env.SG2_KEY,
      callbackURL: process.env.SG3_KEY
    }
  };
  
  module.exports = ids;