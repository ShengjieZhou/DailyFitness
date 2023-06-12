const Card = () => {
    return (
        <div
            style={{ backgroundColor: backgroundColor }}
            className={[`card-whole`, `card-${size}`].join(" ")}
        >
            {/* header */}
            <div className={[`card-header`].join(" ")} {...headerProps}>
                <div className={[`card-header-left`].join(" ")}>
                    {icon ? (
                        <Icon
                            type="loading-one"
                            className={[`card-icon-header-left`].join(" ")}
                        />
                    ) : null}
                    <span className="card-title-text fr-text--sm medium">
            {titleText}
          </span>
                </div>
                <div className="card-header-right">
                    <Icon
                        type="more"
                        className={moreAction ? "" : "hidden"}
                        onClick={moreFunc}
                    />
                    <Icon
                        type="minus"
                        className={expanded ? "" : "hidden"}
                        onClick={() => {
                            expanded = expansionCard(expanded, isOpen, open);
                        }}
                    />
                    <Icon
                        type="plus"
                        className={!expanded ? "" : "hidden"}
                        onClick={() => {
                            expanded = expansionCard(expanded, isOpen, open);
                        }}
                    />
                </div>
            </div>
            {/* body */}
            <div
                style={isOpen ? {} : { display: "none" }}
                className={[`card-body`, `${expanded ? "" : "hidden"}`].join(" ")}
                {...bodyProps}
            >
                {children}
            </div>
            {/* footer */}
            <div className="card-footer" {...footerProps}>
                <span className="fr-text-xs regular">{footerText}</span>
            </div>
        </div>
    );
}

export default Card;

