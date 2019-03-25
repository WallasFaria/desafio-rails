class ViewsController < ApplicationController
  def create
    @video = Video.find(params['video_id'])
    @video.increment_views!
    head :created
  end
end
