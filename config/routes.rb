Rails.application.routes.draw do
  root 'pages#index'

  get '/about' => 'pages#about'
  get '/help' => 'pages#help'
  get '/contact' => 'pages#contact'
end
