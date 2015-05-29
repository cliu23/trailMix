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
      searchuri = HTTParty.get "http://api.openweathermap.org/data/2.5/forecast/daily?lat=#{@lat}&lon=#{@lon}&units=imperial&cnt=5&mode=json"
      @responses = JSON.parse(searchuri.body)
      @name = @responses['city']['name']
      puts @responses
      @instagram = Instagram.tag_recent_media("#{@name}", {:count => 4})
  end
  # container method
  def show
  # we need to take lat and lon from show location and save as varialble named lat lon
  # we need to remove whitespace from trail name and save as a variable named name
  # weather endpoint
        searchuri = HTTParty.get "http://api.openweathermap.org/data/2.5/forecast/daily?lat=#{@lat}&lon=#{@lon}&units=imperial&cnt=5&mode=json"
        @responses = JSON.parse(searchuri.body)
 
  # tweet and instagram endpoints
      @tweets = $client.search("##{name}" + " -rt", result_type: "recent").take(3)
       @instagram = Instagram.tag_recent_media("#{name}", {:count => 4})
  end
end

