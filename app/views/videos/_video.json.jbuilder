json.extract! video, :id, :name, :url, :total_views, :created_at

json.owner do
  json.id video.user.id
  json.name video.user.full_name
end