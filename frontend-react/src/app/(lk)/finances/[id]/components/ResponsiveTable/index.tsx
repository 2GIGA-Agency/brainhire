import { DesktopTable } from '../DesktopTable';
import { MobileTable } from '../MobileTable';
import { useMobileCheck } from '../../hooks/useMobileCheck';

export const ResponsiveTable = () => {
	const isMobile = useMobileCheck();

	return isMobile ? <MobileTable /> : <DesktopTable />;
};
