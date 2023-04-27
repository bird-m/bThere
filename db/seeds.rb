# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Form.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember email, and password:
    user = User.create!(
      email: 'demo@user.io', 
      password: 'password'
    )
  
    # More users
    # 10.times do 
    #   User.create!({
    #     email: Faker::Internet.unique.email,
    #     password: 'password'
    #   }) 
    # end

    puts "Creating forms..."
    # user = User.first

  Form.create(
    title: 'Customer Feedback',
    description: 'A form to collect feedback from customers',
    status: 'active',
    user_id: user.id,
    custom_url: 'customer-feedback'
  )

  Form.create(
    title: 'Job Application',
    description: 'A form for job applicants to apply',
    status: 'inactive',
    user_id: user.id,
    custom_url: 'job-application'
  )

  Form.create(
    title: 'Newsletter Subscription',
    description: 'A form for users to subscribe to our newsletter',
    status: 'active',
    user_id: user.id,
    custom_url: 'newsletter-subscription'
  )

  Form.create(
    title: 'Contact Us',
    description: 'A form for contacting our support team',
    status: 'active',
    user_id: user.id,
    custom_url: 'contact-us'
  )

  Form.create(
    title: 'Product Feedback',
    description: 'A form to collect feedback on our products',
    status: 'active',
    user_id: user.id,
    custom_url: 'product-feedback'
  )
  
    puts "Done!"
  end