import * as popupTemplate from "../../../Handlebars/templates/UI/Popup/popup.hbs";
import "bootstrap/js/dist/modal";

export class Popup {
    private $popupElement: JQuery<HTMLElement>;

    constructor(config: PopupOptions) {
        config.id = config.id + "_popup";
        this.init(config);
    }

    private init(config: PopupOptions): void {
        $("body").append(popupTemplate(config));
        this.$popupElement = $(`#${config.id}`);

        //Register Click Events
        this.$popupElement.on("click", "#btnPrimary", () =>
            config.primaryBtnCallback(this.$popupElement)
        );

        this.$popupElement.on("click", "#btnSecondary", () =>
            config.secondaryBtnCallback(this.$popupElement)
        );

        // config.secondaryBtnCallback !== null
        //     ? this.$popupElement.on("click", "#btnSecondary", () =>
        //           config.secondaryBtnCallback(this.$popupElement)
        //       )
        //     : this.$popupElement.on("click", "#btnSecondary", () =>
        //           this.hide()
        //       );
    }

    show(): void {
        this.$popupElement.modal("show");
    }

    hide(): void {
        this.$popupElement.modal("hide");
        $(".modal-backdrop").remove();
        this.$popupElement.remove();
        $("body")
            .removeClass("modal-open")
            .attr("style", "padding-right:0");
    }
}

export class PopupOptions {
    id: string;
    title: string;
    bodyText: string;
    customClass?: string;
    showCloseBtn: boolean = true;
    primaryBtnText: string;
    secondaryBtnText: string;
    onlyPrimaryBtnRequired: boolean = false;

    primaryBtnCallback: ($popup: JQuery<HTMLElement>) => void = null;
    secondaryBtnCallback: ($popup: JQuery<HTMLElement>) => void = null;
}
