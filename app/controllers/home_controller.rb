class HomeController < ApplicationController
  before_action :authenticate_unless_public_pages!

  def index; end

  private
    def authenticate_unless_public_pages!
      public_pages = request.path == '/' ||
                     request.path.match?(/^\/?video\/[0-9]+$/)
      authenticate_user! unless public_pages
    end
end
