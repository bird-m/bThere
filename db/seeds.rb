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
    Question.destroy_all
    Form.destroy_all
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('forms')
    ApplicationRecord.connection.reset_pk_sequence!('questions')
  
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
  customer_feedback_form = Form.create!(
    title: 'Customer Feedback',
    description: 'A form to collect feedback from customers',
    status: 'active',
    user_id: user.id,
    custom_url: 'customer-feedback'
  )

  job_application_form = Form.create!(
    title: 'Job Application',
    description: 'A form for job applicants to apply',
    status: 'inactive',
    user_id: user.id,
    custom_url: 'job-application'
  )

  newsletter_subscription_form = Form.create!(
    title: 'Newsletter Subscription',
    description: 'A form for users to subscribe to our newsletter',
    status: 'active',
    user_id: user.id,
    custom_url: 'newsletter-subscription'
  )

  contact_us_form = Form.create!(
    title: 'Contact Us',
    description: 'A form for contacting our support team',
    status: 'active',
    user_id: user.id,
    custom_url: 'contact-us'
  )

  product_feedback_form = Form.create!(
    title: 'Product Feedback',
    description: 'A form to collect feedback on our products',
    status: 'active',
    user_id: user.id,
    custom_url: 'product-feedback'
  )

  puts "Creating questions..."
  # Customer Feedback form questions
  Question.create!(
    prompt: 'How likely are you to recommend our product to a friend or colleague?',
    description: 'On a scale of 1-10, how likely are you to recommend our product to a friend or colleague?',
    required: true,
    form_id: customer_feedback_form.id
  )

  Question.create!(
    prompt: 'What features do you like the most about our product?',
    description: 'Please let us know what features you like the most about our product.',
    required: true,
    form_id: customer_feedback_form.id
  )

  # Job Application form questions
  Question.create!(
    prompt: 'What position are you applying for?',
    description: 'Please let us know which position you are applying for.',
    required: true,
    form_id: job_application_form.id
  )

  Question.create!(
    prompt: 'What is your salary expectation?',
    description: 'Please let us know your salary expectation for this position.',
    required: true,
    form_id: job_application_form.id
  )

  # Newsletter Subscription form questions
  Question.create!(
    prompt: 'What type of content would you like to receive in our newsletter?',
    description: 'Please let us know what type of content you would like to receive in our newsletter.',
    required: true,
    form_id: newsletter_subscription_form.id
  )
  
    puts "Done!"
  end