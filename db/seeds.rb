for i in 0..6

	User.create(name: "user" + i.to_s , email: "user" + i.to_s + "@example.com", password: "iamuser" + i.to_s)

end