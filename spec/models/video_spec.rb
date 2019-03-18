require 'rails_helper'

RSpec.describe Video, type: :model do
  it { should belong_to(:user) }

  context 'validates' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:url) }

    it { expect(subject).to respond_to(:total_views) }
    it { expect(subject).to_not respond_to(:total_views=) }

    describe 'url' do
      context 'valids' do
        it 'should has http(s) and with m3u8 extension' do
          should allow_value('https://urldovideo.com/video.m3u8').for(:url)
          should allow_value('http://urldovideo.com/video.m3u8').for(:url)
        end
      end

      context 'invalids' do
        it 'should not allow without http(s)' do
          should_not allow_value('urldovideo.com/video.m3u8').for(:url)
        end

        it 'should not allow without m3u8 extension' do
          should_not allow_value('http://urldovideo.com/video').for(:url)
          should_not allow_value('http://urldovideo.com/video.m3u81s').for(:url)
        end
      end
    end
  end

  describe '#increment_views' do
    let(:video) { create(:video) }

    it 'add 1 view on the total_views field' do
      expect(video.total_views).to eq 0

      video.increment_views!
      expect(video.total_views).to eq 1
    end

    it 'create a new view to video' do
      expect(video.views.count).to eq 0
      video.increment_views!
      expect(video.views.count).to eq 1
    end
  end
end
