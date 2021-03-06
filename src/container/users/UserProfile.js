import React, { Component } from 'react';
import {Image, Grid, Col, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getMedications, deleteMedication } from '../../actions/medicationActions';
import { getInsurances, deleteInsurance } from '../../actions/insuranceActions';
import { getProviders, deleteProvider } from '../../actions/providerActions';
import UserMeds from './UserMeds'
import UserInsurance from './UserInsurance'
import UserProviders from './UserProviders'

class UserProfile extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAddMed: false,
      isAddIns: false,
      isAddProv: false,
      isEditMed: false,
      isEditIns: false,
      isEditProv: false,
      user: this.props.user,
      medication: this.props.medication,
      insurance: this.props.insurance,
      provider: this.props.provider,
    }
  }

  toggleCreateMeds = () => {
    this.setState({
      isAddMed: !this.state.isAddMed,
    })
  }
  toggleCreateIns = () => {
    this.setState({
      isAddIns: !this.state.isAddIns,
    })
  }
  toggleCreateProv = () => {
    this.setState({
      isAddProv: !this.state.isAddProv,
    })
  }

  toggleEditMeds = (medication) => {
    this.setState({
      isEditMed: !this.state.isEditMed,
      isEditIns: this.state.isEditIns,
      isEditProv: this.state.isEditProv,
      medication: medication
    })
  }
  toggleEditIns = (insurance) => {
    this.setState({
      isEditMed: this.state.isEditMed,
      isEditIns: !this.state.isEditIns,
      isEditProv: this.state.isEditProv,
      insurance: insurance
    })
  }

  toggleEditProv = (provider) => {
    this.setState({
      isEditMed: this.state.isEditMed,
      isEditIns: this.state.isEditIns,
      isEditProv: !this.state.isEditProv,
      provider: provider
    })
  }

  handleDeleteMed = (medication) => {
    this.props.deleteMedication(medication)
  }

  handleDeleteIns = (insurance) => {
    this.props.deleteInsurance(insurance)
  }

  handleDeleteProv = (provider) => {
    this.props.deleteProvider(provider)
  }

  componentDidMount() {
    this.props.getMedications()
    this.props.getInsurances()
    this.props.getProviders()
  }

  render() {
    console.log(this.props);
    return(
      <div className="container">
        <Grid>
          <Col md={4}>
            <div className="ProfileImage">
              <Image src="/thumbnail.png" thumbnail />
              <Button bsStyle="link">Add Image</Button> | <Button bsStyle="link">Change Image</Button>
              <p>Add an image that gives you joy</p>
            </div>
          </Col>
          <Col md={8}>
            <h1>{this.props.user.name}</h1>

            <UserMeds
              user={this.props.user}
              medications={this.props.medications}
              addMed={this.toggleCreateMeds}
              editMed={this.toggleEditMeds}

              isAddMed={this.state.isAddMed}
              isEditMed={this.state.isEditMed}
              isEditIns={this.state.isEditIns}
              isEditProv={this.state.isEditProv}

              selectedMed={this.state.medication}
              deleteMed={this.handleDeleteMed}/>

            <UserInsurance
              insurances={this.props.insurances}
              addIns={this.toggleCreateIns}
              editIns={this.toggleEditIns}

              isAddIns={this.state.isAddIns}
              isEditMed={this.state.isEditMed}
              isEditIns={this.state.isEditIns}
              isEditProv={this.state.isEditProv}

              selectedIns={this.state.insurance}
              deleteIns={this.handleDeleteIns}/>

            <UserProviders
              providers={this.props.providers}
              addProv={this.toggleCreateProv}
              editProv={this.toggleEditProv}

              isAddProv={this.state.isAddProv}
              isEditMed={this.state.isEditMed}
              isEditIns={this.state.isEditIns}
              isEditProv={this.state.isEditProv}

              selectedProv={this.state.provider}
              deleteProv={this.handleDeleteProv}/>
          </Col>
        </Grid>
      </div>
    );
  }
}


const mapStatesToProps = (state) => {
  return ({
    users: state.users,
    medications: state.medications,
    insurances: state.insurances,
    providers: state.providers,
    medication: state.medication,
    insurance: state.insurance,
    provider: state.provider
  });
};

export default connect(mapStatesToProps, { getMedications, getInsurances, getProviders, deleteMedication, deleteInsurance, deleteProvider })(UserProfile);
