class PagesController < ApplicationController
  def index

    endpoint = "https://outdoor-data-api.herokuapp.com/api.json?api_key=4146c148c3d63d322c2b88b4870a6ba1"
    if params[:location] && params[:location] != ''
      @geocode = Geocoder.coordinates(params[:location])
      @lat = @geocode[0]
      @lon = @geocode[1]
    end


    if params[:activity]
      if @lat && @lon
        @response = HTTParty.get(endpoint + "&q[activities_activity_type_name_cont]=#{params[:activity]}&lat=#{@lat}&lon=#{@lon}")
      else
        @response = HTTParty.get(endpoint + "&q[activities_activity_type_name_cont]=#{params[:activity]}")
      end
      @coordinates = []
      @response["places"].each do |place|
        @coordinates << [place["lat"],place["lon"]]
      end
    elsif params[:activity] == ''
      if @lat && @lon
        @response = HTTParty.get(endpoint + "&lat=#{@lat}&lon=#{@lon}")
      else
        @response = HTTParty.get(endpoint)
      end
      @coordinates = []
      @response["places"].each do |place|
        @coordinates << [place["lat"],place["lon"]]
      end
    end

  
  end 
  def weather
      if params[:location] && params[:location] != ''
        zip = params[:location]
    # uri = HTTParty.get 'http://api.openweathermap.org/data/2.5/'
        searchuri = HTTParty.get "http://api.openweathermap.org/data/2.5/weather?zip=#{zip},us&units=imperial"
        @response = JSON.parse(searchuri.body)
      end
  end
  def twitter
      if params[:tag] && params[:tag] != ''
        tag = params[:tag]
        @tweets = $client.search("##{tag}" + " -rt", result_type: "recent").take(3)
      end
    end
    def instagram
    if params[:tag] && params[:tag] != ''
      tag = params[:tag]
        @instagram = Instagram.tag_recent_media("#{tag}", {:count => 4})
    end
  end
end
