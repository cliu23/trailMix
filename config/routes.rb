Rails.application.routes.draw do
  root 'pages#welcome'
  get '/trails' => 'pages#index'
  get '/trails/trailinfo' => 'pages#show'

  get '/about' => 'pages#about'
  get '/help' => 'pages#help'
  get '/contact' => 'pages#contact'
  get '/blog' => 'pages#blog'
end
