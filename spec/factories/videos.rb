FactoryBot.define do
  factory :video do
    name { Faker::Lorem.sentence(4) }
    url { 'https://content.jwplatform.com/manifests/yp34SRmf.m3u8' }
    user
  end
end