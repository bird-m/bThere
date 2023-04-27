class Api::QuestionsController < ApplicationController
  
  def create
    debugger
    render json: "you have gotten here"
  end

  def show
    debugger
    puts "I AM HERE!!"
    render json: "you have gotten here"
  end
end
