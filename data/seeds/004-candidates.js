exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('userContacts')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('userContacts').insert([
        {
          id: 1,
          user_id: 'abc123cba',
          name: 'Cinderella',
          email: 'cinderella@gmail.com',
          title: 'Master Sweeper',
          years_of_experience: 25,
          skills: 'housework, mopping, sweeping',
          education: 'GED',
          industry: 'hospitality',
          languages: 'German',
          bio: true,
          picture: true,
          posts: true,
        },
        {
          id: 2,
          user_id: 'abc123xyz',
          name: 'Snow White',
          email: 'snowwhite@gmail.com',
          title: 'Princess',
          years_of_experience: 18,
          skills: 'singing, eating apples, feeding dwarves',
          education: 'some college',
          industry: 'cottage',
          languages: 'German, French, English',
          certifications: 'Apple Picking Certification 1875',
          bio: false,
          picture: true,
          posts: true,
        },
        {
          id: 3,
          user_id: 'xyz987zyx',
          name: 'Sleeping Beauty',
          email: 'yawnsnorezzzz@gmail.com',
          title: 'Princess',
          years_of_experience: 10,
          skills: 'sleeping, snoring, drooling',
          industry: 'mattress',
          languages: 'English',
          bio: true,
          picture: true,
          posts: false,
        },
        {
          id: 4,
          user_id: 'xyz987zyx',
          name: 'Mulan',
          email: 'beaman@gmail.com',
          years_of_experience: 2,
          skills: 'kicking butt, taking names',
          industry: 'army',
          languages: 'Mandarin, Cantonese',
          education: 'bootcamp',
          bio: true,
          picture: true,
          posts: false,
        },
      ]);
    });
};
