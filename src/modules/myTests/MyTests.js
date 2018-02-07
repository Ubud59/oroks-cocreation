import React, { Component } from 'react';
import {connect} from "react-redux";

class MyTests extends Component {

  render() {
    return (
      <div class="list-group">
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">TEST EN DUR 1</h5>
            <small>3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small>
            Donec id elit non mi porta.
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" class="btn btn-outline btn-secondary btn-sm">Je participe</button>
            </div>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
            <a class="btn btn-secondary btn-sm" href="/myprofile" role="button">Je donne mon avis</a>
            </div>
            </div>
          </small>
        </a>
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">TEST EN DUR 2</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small class="text-muted">
            Donec id elit non mi porta.
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" class="btn btn-outline btn-secondary btn-sm">Je participe</button>
            </div>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
            <a class="btn btn-secondary btn-sm" href="/myprofile" role="button">Je donne mon avis</a>
            </div>
            </div>
          </small>
        </a>
        <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">TEST EN DUR 3</h5>
            <small class="text-muted">3 days ago</small>
          </div>
          <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
          <small class="text-muted">
            Donec id elit non mi porta.
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
            <div class="btn-group mr-2" role="group" aria-label="First group">
            <button type="button" class="btn btn-outline btn-secondary btn-sm">Je participe</button>
            </div>
            <div class="btn-group mr-2" role="group" aria-label="Second group">
            <a class="btn btn-secondary btn-sm" href="/myprofile" role="button">Je donne mon avis</a>
            </div>
            </div>
          </small>
        </a>
      </div>
    );
  }
}

const MyTestsComponent = connect(null, null)(MyTests)

export default MyTestsComponent;
