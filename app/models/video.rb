class Video < ApplicationRecord
  belongs_to :user
  has_many :views

  validates :name, presence: true
  validates :url, presence: true

  def increment_views!
    increment! :total_views
    views.create
  end

  private
    def total_views=(value); end
end
