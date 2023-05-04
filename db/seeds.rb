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
  Response.destroy_all
  Submission.destroy_all
  Question.destroy_all
  Form.destroy_all
  User.destroy_all
  puts 'Destroying all ActiveStorage attachments'
  ActiveStorage::Attachment.all.each { |attachment| attachment.purge }

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('forms')
  ApplicationRecord.connection.reset_pk_sequence!('questions')
  ApplicationRecord.connection.reset_pk_sequence!('responses')
  ApplicationRecord.connection.reset_pk_sequence!('submissions')

  puts "Creating users..."
  # Create one user with an easy to remember email, and password:
  user = User.create!(
    email: 'demo@user.io', 
    password: 'password'
  )

  puts "Creating form"
  form1 = Form.create(title: "Taylor's Birthday Party", description: "No need to bring anything, your...presENCE is a present enough ;)", status: "published", user: user, custom_url: "taylor-bday")

  puts "Creating questions"
  question1 = Question.create(prompt: "Are there any dietary restrictions we should be aware of?", required: true, form: form1)
  question2 = Question.create(prompt: "What is a favorite memory you have with Taylor?", required: true, form: form1)
  question3 = Question.create(prompt: "Anything else to share?", required: true, form: form1)


  puts "Creating submissions"
  submission1 = Submission.create(form: form1, name: "Charlie", email: "charlie@example.com", status: "accept")
  submission2 = Submission.create(form: form1, name: "Alex", email: "alex@example.com", status: "accept")
  submission3 = Submission.create(form: form1, name: "Avery", email: "avery@example.com", status: "decline")

  puts "Creating responses"
  Response.create(submission: submission1, question: question1, answer: "Yes, I'm vegetarian.")
  Response.create(submission: submission1, question: question2, answer: "My favorite memory with Taylor was when we went on a road trip together.")
  Response.create(submission: submission1, question: question3, answer: "Looking forward to seeing everyone at the party!")
  
  Response.create(submission: submission2, question: question1, answer: "No, I don't have any dietary restrictions.")
  Response.create(submission: submission2, question: question2, answer: "One of my favorite memories with Taylor was when we went to a concert together.")
  Response.create(submission: submission2, question: question3, answer: "Thanks for inviting me to the party!")

  Response.create(submission: submission3, question: question1, answer: "No, I don't have any dietary restrictions.")
  Response.create(submission: submission3, question: question2, answer: "I'm sorry, I don't have a favorite memory with Taylor as we haven't met before.")
  Response.create(submission: submission3, question: question3, answer: "Sorry, I won't be able to make it to the party but thank you for the invitation!")

  puts "Done!"
end

  # ******Old

  # user2 = User.create!(
    #   email: 'test@user.io', 
    #   password: '1111111'
    # )
  
    # # More users
    # # 10.times do 
    # #   User.create!({
    # #     email: Faker::Internet.unique.email,
    # #     password: 'password'
    # #   }) 
    # # end

    # i = 0

    # User.all.each do |user|
    #   5.times do |n|
    #     puts "form#{n+1}"
    #     form = user.forms.create!(
    #       title: "Form #{n+1}",
    #       description: "This is form #{n+1}",
    #       status: "active",
    #       custom_url: "form#{i}"
    #     )
    
    #     question1 = form.questions.create!(
    #       prompt: "Question 1",
    #       description: "This is question 1",
    #       required: true
    #     )
        
    #     question2 = form.questions.create!(
    #       prompt: "Question 2",
    #       description: "This is question 2",
    #       required: false
    #     )

    #     sub1 = Submission.create!(form_id: form.id)

    #     question1.responses.create!(answer: "Response 1", submission_id: sub1.id)
    #     question2.responses.create!(answer: "Response 2", submission_id: sub1.id)

    #     sub2 = Submission.create!(form_id: form.id)

    #     question1.responses.create!(answer: "Response 1", submission_id: sub2.id)
    #     question2.responses.create!(answer: "Response 2", submission_id: sub2.id)
    #     i += 1
    #   end
    # end

    # ******Old

  # puts "Creating forms..."
  # customer_feedback_form = Form.create!(
  #   title: 'Customer Feedback',
  #   description: 'A form to collect feedback from customers',
  #   status: 'active',
  #   user_id: user.id,
  #   custom_url: 'customer-feedback'
  # )

  # job_application_form = Form.create!(
  #   title: 'Job Application',
  #   description: 'A form for job applicants to apply',
  #   status: 'inactive',
  #   user_id: user.id,
  #   custom_url: 'job-application'
  # )

  # newsletter_subscription_form = Form.create!(
  #   title: 'Newsletter Subscription',
  #   description: 'A form for users to subscribe to our newsletter',
  #   status: 'active',
  #   user_id: user.id,
  #   custom_url: 'newsletter-subscription'
  # )

  # contact_us_form = Form.create!(
  #   title: 'Contact Us',
  #   description: 'A form for contacting our support team',
  #   status: 'active',
  #   user_id: user.id,
  #   custom_url: 'contact-us'
  # )

  # product_feedback_form = Form.create!(
  #   title: 'Product Feedback',
  #   description: 'A form to collect feedback on our products',
  #   status: 'active',
  #   user_id: user.id,
  #   custom_url: 'product-feedback'
  # )

  # puts "Creating questions..."
  # # Customer Feedback form questions
  # Question.create!(
  #   prompt: 'How likely are you to recommend our product to a friend or colleague?',
  #   description: 'On a scale of 1-10, how likely are you to recommend our product to a friend or colleague?',
  #   required: true,
  #   form_id: customer_feedback_form.id
  # )

  # Question.create!(
  #   prompt: 'What features do you like the most about our product?',
  #   description: 'Please let us know what features you like the most about our product.',
  #   required: true,
  #   form_id: customer_feedback_form.id
  # )

  # # Job Application form questions
  # Question.create!(
  #   prompt: 'What position are you applying for?',
  #   description: 'Please let us know which position you are applying for.',
  #   required: true,
  #   form_id: job_application_form.id
  # )

  # Question.create!(
  #   prompt: 'What is your salary expectation?',
  #   description: 'Please let us know your salary expectation for this position.',
  #   required: true,
  #   form_id: job_application_form.id
  # )

  # # Newsletter Subscription form questions
  # Question.create!(
  #   prompt: 'What type of content would you like to receive in our newsletter?',
  #   description: 'Please let us know what type of content you would like to receive in our newsletter.',
  #   required: true,
  #   form_id: newsletter_subscription_form.id
  # )