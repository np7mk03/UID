from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# In-memory storage
sales = []
clients = []
current_id = 1

@app.route('/')
def welcome():
    return render_template('welcome.html')

@app.route('/infinity')
def log_sales():
    return render_template('log_sales.html', sales=sales, clients=clients)

@app.route('/save_sale', methods=['POST'])
def save_sale():
    global current_id
    data = request.get_json()
    if not data.get('client') or not isinstance(data.get('reams'), int):
        return jsonify({'error': 'Invalid data'}), 400

    data['id'] = current_id
    sales.insert(0, data)  # Insert at the beginning
    current_id += 1

    if data['client'] not in clients:
        clients.append(data['client'])

    return jsonify({'sales': sales, 'clients': clients})

@app.route('/delete_sale', methods=['POST'])
def delete_sale():
    data = request.get_json()
    sale_id = data.get('id')
    global sales
    sales = [s for s in sales if s['id'] != sale_id]

    return jsonify({'sales': sales})

if __name__ == '__main__':
    app.run(debug=True)
