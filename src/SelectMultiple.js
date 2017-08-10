import React, { Component } from "react";
import { View, ListView, Text, TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import PropTypes from "prop-types";
import styles from "./SelectMultiple.styles";
import checkbox from "../images/icon-checkbox.png";
import checkboxChecked from "../images/icon-checkbox-checked.png";

const { width } = Dimensions.get("window");

const itemType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.shape({ image: PropTypes.string, value: PropTypes.any })
]);

const styleType = PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]);

const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number]);

// A customiseable ListView that allows you to select multiple rows
export default class SelectMultiple extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(itemType).isRequired,
    selectedItems: PropTypes.arrayOf(itemType),

    onSelectionsChange: PropTypes.func.isRequired,
    onPress: PropTypes.func.isRequired,

    horizontal: PropTypes.bool,

    checkboxSource: sourceType,
    selectedCheckboxSource: sourceType,

    style: styleType,
    rowStyle: styleType,
    checkboxStyle: styleType,
    imageStyle: styleType,

    selectedRowStyle: styleType,
    selectedCheckboxStyle: styleType,
    selectedImageStyle: styleType
  };

  static defaultProps = {
    selectedItems: [],
    style: {},
    rowStyle: {},
    checkboxStyle: {},
    checkboxCheckedStyle: {},
    imageStyle: {},
    horizontal: false,
    checkboxSource: checkbox,
    selectedCheckboxSource: checkboxChecked
  };

  constructor(props) {
    super(props);

    const rows = this.getRowData(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.value !== r2.value || r1.selected !== r2.selected
    }).cloneWithRows(rows);

    this.state = { dataSource };
  }

  componentWillReceiveProps(nextProps) {
    const rows = this.getRowData(nextProps);
    const dataSource = this.state.dataSource.cloneWithRows(rows);
    this.setState({ dataSource });
  }

  getRowData({ items, selectedItems }) {
    items = items.map(this.toImageValueObject);
    selectedItems = (selectedItems || []).map(this.toImageValueObject);

    items.forEach(item => {
      item.selected = selectedItems.some(i => i.value === item.value);
    });

    return items;
  }

  onRowLongPress(row, index) {
    row = Object.assign({}, row);

    let { selectedItems } = this.props;

    selectedItems = (selectedItems || []).map(this.toImageValueObject);

    const selectedIndex = selectedItems.findIndex(selectedItem => selectedItem.value === row.value);

    if (selectedIndex > -1) {
      selectedItems = selectedItems.filter(selectedItem => selectedItem.value !== row.value);
    } else {
      selectedItems = selectedItems.concat(row);
    }

    this.props.onSelectionsChange(selectedItems, row, index);
  }

  onRowPress(row, index) {
    this.props.onPress(row.image, index);
  }

  toImageValueObject(obj) {
    return { image: obj, value: obj };
  }

  render() {
    const { dataSource } = this.state;
    const { renderItemRow } = this;
    return (
      <ListView
        style={this.props.styles}
        contentContainerStyle={styles.container}
        dataSource={dataSource}
        renderRow={renderItemRow}
        horizontal={this.props.horizontal}
        initialListSize={15}
        enableEmptySections={true}
      />
    );
  }

  renderItemRow = (row, sectionID, rowID) => {
    let index = parseInt(rowID);
    let {
      checkboxSource,
      rowStyle,
      imageStyle,
      checkboxStyle,
      selectedCheckboxSource,
      selectedRowStyle,
      selectedCheckboxStyle,
      selectedImageStyle,
      loadingSource,
      loadingStyle,
      processingMessageWrapperStyle,
      processingMessageStyle
    } = this.props;

    loadingStyle = [styles.loading, loadingStyle];
    processingMessageStyle = [styles.processingMessage, processingMessageStyle];

    if (row.image.isProcessing) {
      processingMessageWrapperStyle = [
        styles.processingMessageWrapper,
        styles.processingMessageWrapperProcessing,
        processingMessageWrapperStyle
      ];
    } else {
      processingMessageWrapperStyle = [
        styles.processingMessageWrapper,
        processingMessageWrapperStyle
      ];
    }

    if (row.image.selected) {
      checkboxSource = selectedCheckboxSource;
      rowStyle = [styles.row, rowStyle, selectedRowStyle];
      checkboxStyle = [styles.checkbox, checkboxStyle, selectedCheckboxStyle];
      imageStyle = [styles.image, imageStyle, selectedImageStyle];
    } else {
      rowStyle = [styles.row, rowStyle];
      checkboxStyle = [styles.checkbox, checkboxStyle];
      imageStyle = [styles.image, imageStyle];
    }

    return (
      <TouchableWithoutFeedback
        delayLongPress={1000}
        onPress={() => this.onRowPress(row, index)}
        onLongPress={() => this.onRowLongPress(row, index)}
      >
        <View style={rowStyle}>
          <TouchableWithoutFeedback onPress={() => this.onRowLongPress(row, index)}>
            <View style={styles.checkboxWrapper}>
              <Image style={checkboxStyle} source={checkboxSource} />
            </View>
          </TouchableWithoutFeedback>
          <Image style={imageStyle} source={{ uri: row.image.url }} />
          {row.image.isProcessing &&
            <View style={processingMessageWrapperStyle}>
              <Image style={loadingStyle} source={loadingSource} />
              <Text style={processingMessageStyle}>
                Traitement HDR{"\n"}en cours...
              </Text>
            </View>}
        </View>
      </TouchableWithoutFeedback>
    );
  };
}
