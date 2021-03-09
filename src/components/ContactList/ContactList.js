import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import phoneBookOperations from '../../redux/phoneBook/phoneBook-operations';
import phoneBookSelectors from '../../redux/phoneBook/phoneBook-selectors';
import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem';
import s from './Contact.module.css';
import anim from '../animation.module.css';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup component="ul" className={s.wrapper}>
      {contacts.map(({ id, name, number }) => {
        return (
          <CSSTransition timeout={250} classNames={anim} key={id}>
            <ContactListItem
              appear={true}
              name={name}
              number={number}
              unmountOnExit
              onDelete={() => onDeleteContact(id)}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
}

const mapStateToProps = state => {
  return {
    contacts: phoneBookSelectors.getFilteredContacts(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(phoneBookOperations.deleteContact(id)),
});

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
  onDeleteContact: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
