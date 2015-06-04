Rails.application.routes.draw do
  root 'pages#index'

  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'


end
