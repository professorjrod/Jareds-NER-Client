class ScrapeCraigslistJob < ApplicationJob
  queue_as :default

  around_perform :around_cleanup

  def perform(*_args)
    p 'Scraping Craigslist...'
    p "runtime: #{Time.now}"
  end

  private

  def around_cleanup
    # save the current state of the database
    yield
    # do something after perform
  end
end
