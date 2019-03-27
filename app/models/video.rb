class Video < ApplicationRecord
  belongs_to :user
  has_many :views, dependent: :destroy

  validates :name, presence: true
  validates :url, presence: true, url: { allow_blank: true },
                  format: { with: /\.m3u8$/i, multiline: true }

  self.per_page = 10

  scope :search, -> (query) {
    where('unaccent(name) ILIKE unaccent(?)', "%#{query.gsub(' ', '%')}%") if query.present?
  }

  def increment_views!
    increment! :total_views
    views.create
  end

  private
    def total_views=(value); end
end
