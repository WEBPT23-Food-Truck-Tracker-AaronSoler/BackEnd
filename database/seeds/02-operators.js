
exports.seed = function(knex) {
      return knex('operators').insert([
         {
            id: 1,
            username: "user1",
            password: "$2a$10$SS.oGfA6ajNv16k6vcIVe.5GY6L.0W0UQavDIYpyc/5a29nZ53X66",
            email: "someone@email.com",
            first_name: "John",
            last_name: "Doe"
        },
        {
            id: 2,
            username: "user2",
            password: "$2a$10$h79vCIgeEeRKPFQxlLhljuMYNCJRmfXh4KtlldVWOQURNnKkAYrI6",
            email: "someone2@email.com",
            first_name: "John",
            last_name: "Doe"
        },
          {
            id: 3,
            username: "user3",
            password: "$2a$10$h79vCIgeEeRKPFQxlLhljuMYNCJRmfXh4KtlldVWOQURNnKkAYrI6",
            email: "someone3@email.com",
            first_name: "John",
            last_name: "Doe"
        },
          {
            id: 4,
            username: "user4",
            password: "$2a$10$h79vCIgeEeRKPFQxlLhljuMYNCJRmfXh4KtlldVWOQURNnKkAYrI6",
            email: "someone4@email.com",
            first_name: "John",
            last_name: "Doe"
        },
      ]);
};
