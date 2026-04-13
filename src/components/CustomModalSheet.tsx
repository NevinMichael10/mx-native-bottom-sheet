import { Children, ReactElement, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, InteractionManager, Modal, Pressable, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetScrollView
} from "@gorhom/bottom-sheet";
import { EditableValue, ValueStatus } from "mendix";
import { BottomSheetStyle } from "../ui/Styles";

interface CustomModalSheetProps {
    triggerAttribute?: EditableValue<boolean>;
    content?: ReactNode;
    styles: BottomSheetStyle;
    customHandle?: ReactNode;
}

let lastIndexRef = -1;

export const CustomModalSheet = (props: CustomModalSheetProps): ReactElement => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [currentStatus, setCurrentStatus] = useState(false);

    const isAvailable = props.triggerAttribute && props.triggerAttribute.status === ValueStatus.Available;

    const isOpen =
        props.triggerAttribute &&
        props.triggerAttribute.status === ValueStatus.Available &&
        props.triggerAttribute.value;

    const close = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        (backdropProps: BottomSheetBackdropProps) => (
            <Pressable style={{ flex: 1 }} onPress={close}>
                <BottomSheetBackdrop
                    {...backdropProps}
                    pressBehavior={"close"}
                    opacity={0.3}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    style={[backdropProps.style, props.styles.backdrop]}
                />
            </Pressable>
        ),
        [close, props.styles.backdrop]
    );

    const handleSheetChanges = useCallback(
        (index: number) => {
            if (!isAvailable) {
                return;
            }

            const hasOpened = lastIndexRef === -1 && index === 0;
            const hasClosed = index === -1;
            lastIndexRef = index;

            if (hasOpened) {
                props.triggerAttribute?.setValue(true);
            }
            if (hasClosed) {
                props.triggerAttribute?.setValue(false);
            }
        },
        [isAvailable, props.triggerAttribute]
    );

    useEffect(() => {
        if (!isAvailable) {
            return;
        }
        if (props.triggerAttribute?.value && !currentStatus) {
            InteractionManager.runAfterInteractions(() => setCurrentStatus(true));
        } else if (!props.triggerAttribute?.value && currentStatus) {
            bottomSheetRef.current?.close();
            setCurrentStatus(false);
        }
    }, [props.triggerAttribute, currentStatus, isAvailable]);

    const hasCustomHandle = Children.count(props.customHandle) > 0;
    const renderHandle = useCallback(
        (handleProps: any) => {
            return <View {...handleProps}>{props.customHandle}</View>;
        },
        [props.customHandle]
    );

    return (
        <Modal onRequestClose={close} transparent visible={!!isOpen}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={isOpen ? 0 : -1}
                    enableDynamicSizing
                    maxDynamicContentSize={Dimensions.get("screen").height * 0.9}
                    onClose={() => handleSheetChanges(-1)}
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
                    style={[props.styles.modal]}
                    backgroundStyle={props.styles.container}
                    enablePanDownToClose={true}
                    handleStyle={props.styles.handle}
                    handleIndicatorStyle={props.styles.handleIndicator}
                    handleComponent={hasCustomHandle ? renderHandle : undefined}
                >
                    <BottomSheetScrollView contentContainerStyle={{ paddingBottom: 16 }}>
                        {props.content}
                    </BottomSheetScrollView>
                </BottomSheet>
            </GestureHandlerRootView>
        </Modal>
    );
};
