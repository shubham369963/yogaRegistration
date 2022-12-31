import React from 'react'
import "./alert.css";
function alert() {
  return (
    <div>
    <div class="square_box box_three"></div>
  <div class="square_box box_four"></div>
  <div class="container mt-5">
    <div class="row">

      <div class="col-sm-12">
        <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
          <button type="button" class="close font__size-18" data-dismiss="alert">❌</button>
									<span aria-hidden="true">
                    <i class="fa fa-times greencross"></i>
                    </span>
									<span class="sr-only">close</span> 
								
          <i class="start-icon far fa-check-circle faa-tada animated"></i>
          <strong class="font__weight-semibold">Well done!</strong> Your Form is Successfully Sent.
        </div>
      </div>
      </div>
      </div>
      </div>
  )
}

export default alert