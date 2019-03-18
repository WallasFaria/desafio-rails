class Video < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
  validates :url, presence: true

  def increment_views!
    increment! :total_views
  end

  private
    def total_views=(value); end
end
