import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Form from 'Components/Form/Form';
import FormGroup from 'Components/Form/FormGroup';
import FormInputGroup from 'Components/Form/FormInputGroup';
import FormLabel from 'Components/Form/FormLabel';
import Button from 'Components/Link/Button';
import SpinnerButton from 'Components/Link/SpinnerButton';
import ModalBody from 'Components/Modal/ModalBody';
import ModalContent from 'Components/Modal/ModalContent';
import ModalFooter from 'Components/Modal/ModalFooter';
import ModalHeader from 'Components/Modal/ModalHeader';
import { inputTypes, kinds } from 'Helpers/Props';
import MoveSeriesModal from 'Series/MoveSeries/MoveSeriesModal';
import translate from 'Utilities/String/translate';
import styles from './EditSeriesModalContent.css';

class EditSeriesModalContent extends Component {

  //
  // Lifecycle

  constructor(props, context) {
    super(props, context);

    this.state = {
      isConfirmMoveModalOpen: false
    };
  }

  //
  // Listeners

  onCancelPress = () => {
    this.setState({ isConfirmMoveModalOpen: false });
  };

  onSavePress = () => {
    const {
      isPathChanging,
      onSavePress
    } = this.props;

    if (isPathChanging && !this.state.isConfirmMoveModalOpen) {
      this.setState({ isConfirmMoveModalOpen: true });
    } else {
      this.setState({ isConfirmMoveModalOpen: false });

      onSavePress(false);
    }
  };

  onMoveSeriesPress = () => {
    this.setState({ isConfirmMoveModalOpen: false });

    this.props.onSavePress(true);
  };

  //
  // Render

  render() {
    const {
      title,
      item,
      isSaving,
      originalPath,
      onInputChange,
      onModalClose,
      onDeleteSeriesPress,
      ...otherProps
    } = this.props;

    const {
      monitored,
      qualityProfileId,
      path,
      tags
    } = item;

    return (
      <ModalContent onModalClose={onModalClose}>
        <ModalHeader>
          {translate('EditSiteModalHeader', { title })}
        </ModalHeader>

        <ModalBody>
          <Form {...otherProps}>
            <FormGroup>
              <FormLabel>{translate('Monitored')}</FormLabel>

              <FormInputGroup
                type={inputTypes.CHECK}
                name="monitored"
                helpText={translate('MonitoredHelpText')}
                {...monitored}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Quality Profile</FormLabel>

              <FormInputGroup
                type={inputTypes.QUALITY_PROFILE_SELECT}
                name="qualityProfileId"
                {...qualityProfileId}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>Path</FormLabel>

              <FormInputGroup
                type={inputTypes.PATH}
                name="path"
                {...path}
                onChange={onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <FormLabel>{translate('Tags')}</FormLabel>

              <FormInputGroup
                type={inputTypes.TAG}
                name="tags"
                {...tags}
                onChange={onInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>

        <ModalFooter>
          <Button
            className={styles.deleteButton}
            kind={kinds.DANGER}
            onPress={onDeleteSeriesPress}
          >
            {translate('Delete')}
          </Button>

          <Button
            onPress={onModalClose}
          >
            {translate('Cancel')}
          </Button>

          <SpinnerButton
            isSpinning={isSaving}
            onPress={this.onSavePress}
          >
            {translate('Save')}
          </SpinnerButton>
        </ModalFooter>

        <MoveSeriesModal
          originalPath={originalPath}
          destinationPath={path.value}
          isOpen={this.state.isConfirmMoveModalOpen}
          onModalClose={this.onCancelPress}
          onSavePress={this.onSavePress}
          onMoveSeriesPress={this.onMoveSeriesPress}
        />
      </ModalContent>
    );
  }
}

EditSeriesModalContent.propTypes = {
  seriesId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isPathChanging: PropTypes.bool.isRequired,
  originalPath: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onDeleteSeriesPress: PropTypes.func.isRequired
};

export default EditSeriesModalContent;
