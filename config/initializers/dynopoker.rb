require 'dynopoker'

Dynopoker.configure do |config|
    config.address = 'http://picstreamer.herokuapp.com'
#  config.enable = false # default is true
#  config.poke_frequency = 123 # default is 1800s (30min)
end