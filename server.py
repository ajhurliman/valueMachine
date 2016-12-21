from flask import Flask, jsonify, request, abort, send_from_directory
import quandl
import pandas as pd

quandl.ApiConfig.api_key = 'PZnzHYrs8qn4xS94eyca'
quandl.ApiConfig.api_version = '2015-04-09'

app = Flask(__name__)

def get_daily_averages(values):
    daily_avgs = values.copy()
    daily_avgs['daily_avg'] = (daily_avgs['High'] + daily_avgs['Low'] + daily_avgs['Close'])/3
    return daily_avgs['daily_avg']

def get_rolling_mean(values, window):
    return pd.rolling_mean(values, window=window)

def get_rolling_std(values, window):
    return pd.rolling_std(values, window=window)

def get_bollinger_bands(rm, rstd):
    upper_band = rm + (2 * rstd)
    lower_band = rm - (2 * rstd)
    return upper_band, lower_band

@app.route('/')
def root():
  return send_from_directory('./public', 'index.html')

@app.route('/assets/<path:path>')
def send_file(path):
  return send_from_directory('public/assets', path)

@app.route('/api/bollinger/<symbol>')
def get_symbol_data(symbol):
  data = quandl.get('WIKI/' + symbol, start_date='2014-01-01', end_date='2015-01-01')
  daily_avgs = get_daily_averages(data)
  rm = get_rolling_mean(daily_avgs, 20)
  rstd = get_rolling_std(daily_avgs, 20)
  upper_band, lower_band = get_bollinger_bands(rm, rstd)

  data['daily_avgs'] = daily_avgs
  data['rm'] = rm
  data['rstd'] = rstd
  data['upper'] = upper_band
  data['lower'] = lower_band

  # data['avgs'] = daily_avgs = get_daily_averages(data)
  # data['rolling_mean'] = rolling_mean = get_rolling_mean(daily_avgs, 20)
  # data['rolling_std'] = rolling_std = get_rolling_std(daily_avgs, 20)
  # daily_avgs['upper_band'], daily_avgs['lower_band'] = get_bollinger_bands(rolling_mean, rolling_std)
  # myDict = {'a': 2, 'b': 3}
  # return jsonify(myDict)
  return jsonify(data[['daily_avgs','rm','rstd','upper','lower']].to_json())

  @app.route('/<path:path>')
  def catch_all(path):
    return send_from_directory('./public', 'index.html')

if __name__ == '__main__':
  app.run(port=8000, debug=True)
