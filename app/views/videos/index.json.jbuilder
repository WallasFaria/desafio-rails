json.data do
  json.array! @videos, partial: 'videos/video', as: :video
end

json.pagination do
  json.active_page @videos.current_page
  json.items_count_per_page @videos.per_page
  json.total_items_count @videos.count
end