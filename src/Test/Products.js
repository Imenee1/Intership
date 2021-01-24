import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

class Products extends Component {
  state = {
    posts: [],
    isLoading: true,
    error: null,
  };

  getProductsInfo() {
    axios('http://app.getrecall.com:8080/products')
      .then(response => {
        const products = response.data;
        const posts = [];
        for (const artist of products) {
          const { albums, ...rest } = artist;
          for (const album of albums) {
            posts.push({ ...rest, ...album });
          }
        };
        this.setState({
          posts,
          isLoading: false
        });
      })
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.getProductsInfo();
  }
  render() {
    const { isLoading, posts } = this.state;
    const columns = [
    {
      Header: 'Features',
      columns: [
        {
          Header: 'Features',
          accessor: 'features',
        }
      ]
    },
    {
      Header: 'Specifications',
      columns: [
        {
          Header: 'Name',
          accessor: 'name'
          
        }, {
          Header: 'Category',
          accessor: 'category'
          
        }, {
          Header: 'Value',
          accessor: 'value'
          
        }
      ]
    }
  ]

  return (
    <div>
      <h2><center>Products dataset</center>                                                      </h2>
      {!isLoading ? (
        <ReactTable
          data={posts}
          columns={columns}
          defaultPageSize={4}
          pageSizeOptions={[4, 5, 6]}
        />) : (
          <p>Loading .....</p>
        )}
    </div>
    );
  }
}

export default Products;