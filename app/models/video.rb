class Video < ApplicationRecord
  belongs_to :user
  has_many :views

  validates :name, presence: true
  validates :url, presence: true, url: { allow_blank: true },
                  format: { with: /\.m3u8$/i, multiline: true }

  def increment_views!
    increment! :total_views
    views.create
  end

  private
    def total_views=(value); end
end
