FactoryBot.define do
  factory :video do
    name { Faker::Lorem.words(4) }
    url { Faker::Internet.url('example.com', '.m3u8') }
    user
  end
end