import React, { Component } from 'react';
import PropTypes from 'prop-types';

import cogIcon from '../../assets/cog.svg';
import './settings.css';

class Settings extends Component {
    constructor() {
        super();
        this.state = {
            showSettings: false,
            hover: false,
            settingsStyle: {
                display: 'none',
            },
            config: {
                userLocation: '',
                serverURL: ''
            },
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.HandleButtonHoverOn = this.HandleButtonHoverOn.bind(this);
        this.HandleButtonHoverOff = this.HandleButtonHoverOff.bind(this);

        this.handleServerURLChange = this.handleServerURLChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);

        this.getDefaultStateForInput = this.getDefaultStateForInput.bind(this);
    }

    componentWillMount() {
        this.props.map.mapConfig.on('config retrieved', (config) => {
            this.setState({ config });
        });

        this.props.map.mapConfig.on('config not saved', (config) => {
            this.setState({ config });
        });
    }

    getDefaultStateForInput(inputName) {
        const config = this.state.config;
        const defaultConf = this.props.map.mapConfig.defaultConfig;
        return config
            ? config[inputName]
            : defaultConf[inputName];
    }

    handleButtonClick() {
        console.log(this.state);
        if (!this.state.showSettings) {
            this.setState({
                showSettings: true,
                settingsStyle: {
                    display: 'block',
                },
            });
        } else {
            this.setState({
                showSettings: false,
            }, () => {
                // TODO this makes sure that it hides the div after animation
                // otherwise it keeps a small div element of 10 by 10px which prevents interaction.
                // 400 ms is the time it takes for the animation to complete
                setTimeout(() => {
                    if (!this.state.showSettings) {
                        this.setState({
                            settingsStyle: {
                                display: 'none',
                            },
                        });
                    }
                }, 400);
            });
        }
    }

    HandleButtonHoverOn() {
        if (!this.state.hover) {
            this.setState({ hover: true });
        }
    }

    HandleButtonHoverOff() {
        if (this.state.hover) {
            this.setState({ hover: false });
        }
    }

    handleLocationChange(evt) {
        const newVal = evt.target.checked;
        this.props.map.mapConfig.setUserLocation(newVal);
        this.updateConfig({ userLocation: newVal });
    }

    handleServerURLChange(evt) {
        const newVal = evt.target.value;
        this.props.map.mapConfig.setServerURL(newVal);
        this.updateConfig({ imageServerURL: newVal })
    }

    updateConfig(newKeyVal) {
        const newObj = Object.assign(this.state.config,newKeyVal);
        this.setState({ config: newObj });
    }

    renderButton() {
        const animitedClass = this.state.hover
            ? 'settings-button-cog-animated'
            : '';
        return (
            <div
                className="settings-button"
                role="button"
                tabIndex={0}
                onClick={this.handleButtonClick}
                onMouseOver={this.HandleButtonHoverOn}
                onMouseLeave={this.HandleButtonHoverOff}
            >
                <img className={`settings-button-cog ${animitedClass}`} src={cogIcon} alt="Loading Cog" height="28" width="28" />
            </div>
        );
    }

    renderView() {
        const animitedClass = this.state.showSettings
            ? 'popup-show'
            : 'popup-hide';
        return (
            <div className={`settings-view ${animitedClass}`} style={this.state.settingsStyle}>
                <h2 className="settings-view-header">
                    Extension Settings:
                </h2>
                <form>
                    <label htmlFor="userLocation">
                        Show User Location (Slow):
                        <input
                            name="userLocation"
                            type="checkbox"
                            checked={this.state.config.userLocation}
                            onChange={this.handleLocationChange}
                        />
                    </label>
                    <label htmlFor="serverURL">
                        Favorite Sites Image Server:
                        <input
                            name="serverURL"
                            type="text"
                            value={this.state.config.serverURL}
                            onChange={this.handleServerURLChange}
                        />
                    </label>
                </form>
            </div>
        );
    }

    render() {
        return (
            <div className="settings">
                {this.renderButton()}
                {this.renderView()}
            </div>
        );
    }
}

Settings.propTypes = {
    map: PropTypes.object.isRequired,
};

export default Settings;
