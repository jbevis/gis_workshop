DB = Sequel.connect('postgres://@localhost:5432/gis_workshop')

get '/' do
  File.read(File.join('public', 'index.html'))
end

def neighborhoods_feature_collection
  query = 'select ST_AsGeoJSON(ST_Transform(geom, 4326)) as json from nyc_neighborhoods'
  rows = DB[query]
  features = rows.map do |r|
    JSON.parse(r[:json])
  end.map do |geom|
    {type: "Feature", geometry: geom}
  end
  {type: "FeatureCollection", features: features}
end

get '/neighborhoods' do
  content_type :json
  neighborhoods_feature_collection.to_json
end