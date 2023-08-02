import React from 'react';
import {View,StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useThemeAwareObject} from '../theme';
import {wp} from '../util';
import DialogModal from './DiaogModal';

function LoadingModal(props) {
  const createStyles = theme => {
    const themeStyles = StyleSheet.create({
      centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
      modalView: {
        margin: 20,
        width: 200,
        height: 70,
        backgroundColor: theme.color.textRed,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },

      modalText: {
        marginVertical: 15,
        textAlign: 'center',
        fontSize: 17,
        marginLeft: wp(4),
      },
    });
    return themeStyles;
  };
  const styles = useThemeAwareObject(createStyles);
  return (
    <DialogModal visible={props.visible}
    dialogStyle={{
      elevation: 0,
      backgroundColor: 'transparent',
      borderRadius: 0,
    }}>
    <ActivityIndicator color="white" size="large" />
    </DialogModal>
  );
}

export default LoadingModal;
