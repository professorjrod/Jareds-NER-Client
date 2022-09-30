class ScrapeCraigslistJob < ApplicationJob
  queue_as :default

  around_perform :around_cleanup

  require 'httparty'

  # script to scrape craigslist for listings
  # https://portland.craigslist.org/search/mlt/cta?purveyor=owner
  def scrape(url)
    p "scraping #{url}"
    response = HTTParty.get(url)
    html = response.body
    parse(html)
  end

  def parse(html)
    p 'parsing html...'
    doc = Nokogiri::HTML(html)
    text = []
    doc.css('p').each do |p|
      text << p.text
    end
    # <Nokogiri::XML::Element:0xe7cc name="a" attributes=[#<Nokogiri::XML::Attr:0xe7a4 name="class" value="next">] children=[#<Nokogiri::XML::Text:0xe7b8 " next ▶ ">]>
    next_url = doc.css('.next')
    p next_url
  end

  def perform(args)
    p 'Starting scrape job...'
    scrape(args)
    p "runtime: #{Time.now}"
  end

  private

  def around_cleanup
    # save the current state of the database
    yield
    # do something after perform
  end
end
