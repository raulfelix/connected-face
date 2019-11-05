import PropTypes from 'prop-types';
import React from 'react';

export const KEY_TAB = 9;
export const KEY_ESC = 27;

function findFocusableElements(el) {
    return el.querySelectorAll('a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
}

export function setBackgroundContentVisibility(state) {
    const els = document.getElementsByClassName('_not-modal');
    if (els) {
        for (let i = 0; i < els.length; i++) {
            els[i].setAttribute('aria-hidden', state);
        }
    }
}

/**
 * A modal must have at least 1 focusable element.
 */
export default class Modal extends React.Component {
    componentDidMount() {
        const modal = document.getElementById(this.props.id);

        this.onComponentDidMount(modal);
    }

    onComponentDidMount(modal) {
        this.modal = modal;
        modal.addEventListener('keydown', (e) => {
            this.onKeyDown(e);
        });
        this.focusables = findFocusableElements(modal);

        if (this.props.predecessorId) {
            this.priorElementFocus = document.getElementById(this.props.predecessorId);
        } else {
            this.priorElementFocus = document.activeElement;
        }

        // focus on close button if available otherwise focus on title
        if (this.props.onClose) {
            setTimeout(() => this.getFirstEl().focus(), 300);
        } else {
            setTimeout(() => this.modal.querySelector(`#${this.props.id}-title`).focus(), 300);
        }
    }

    onKeyDown(e) {
        this.focusables = findFocusableElements(this.modal);

        switch (e.keyCode) {
            case KEY_TAB:
                if (this.focusables.length === 1) {
                    e.preventDefault();
                    this.getFirstEl().focus();
                    break;
                }

                if (e.shiftKey) {
                    this.onBackwardTab(e);
                } else {
                    this.onForwardTab(e);
                }
                break;
            case KEY_ESC:
                if (this.props.onClose) {
                    this.close();
                }
                break;
            default:
                break;
        }
    }

    onBackwardTab(e) {
        if (document.activeElement === this.getFirstEl()) {
            e.preventDefault();
            this.getLastEl().focus();
        }
    }

    onForwardTab(e) {
        if (document.activeElement === this.getLastEl()) {
            e.preventDefault();
            this.getFirstEl().focus();
        }
    }

    getFirstEl() {
        return this.focusables[0];
    }

    getLastEl() {
        return this.focusables[this.focusables.length - 1];
    }

    close() {
        if (this.props.onClose) {
            this.props.onClose();
        }

        if (this.priorElementFocus) {
            this.priorElementFocus.focus();
        }
    }

    addFooterClasses() {
        if (this.props.footerAlignment) {
            return `modal__footer modal__footer--${this.props.footerAlignment}`;
        }
        return 'modal__footer';
    }

    render() {
        const {
            id,
            onClose,
            className,
            children,
            variant,
            closeButtonLabel,
            footer,
            title
        } = this.props;
        const classes = ['modal'];

        if (className) {
            classes.push(className);
        }

        if (variant === 'full') {
            classes.push('modal--full');
        }

        return (
            <div id={id} className={classes.join(' ')} role="dialog" aria-labelledby={`${id}-title`}>
                <div className="modal__container surface__modal" role="document">
                    <div className="modal__header">
                        <div className="p-row">
                            <div className="p-12">
                                <div className="modal__title text20--emphasis">{title}</div>
                            </div>
                        </div>
                        {
                            onClose !== null && (
                                <button
                                  id={`${id}-close`}
                                  type="button"
                                  className="modal__close btn btn--icon icon-window-close"
                                  aria-label={closeButtonLabel}
                                  onClick={() => this.close()}
                                />
                            )
                        }
                    </div>
                    <div className="modal__content">
                        {children}
                    </div>
                    {
                        footer && (
                            <div className={this.addFooterClasses()}>
                                {footer}
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

Modal.defaultProps = {
    closeButtonLabel: 'Close modal',
    className: '',
    predecessorId: '',
    variant: '',
    onClose: null,
    footer: null,
    footerAlignment: ''
};

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    footer: PropTypes.node,
    footerAlignment: PropTypes.string,
    closeButtonLabel: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    predecessorId: PropTypes.string,
    onClose: PropTypes.func
};
