import { IAddLinksQuery } from './interfaces/AddLinksQuery'
import { ICrawledLink } from './interfaces/CrawledLink'
import { ICrawledLinkQuery } from './interfaces/CrawledLinkQuery'
import { IDirectConnectionInfos } from './interfaces/DirectConnectionInfos'
import { IDownloadLink } from './interfaces/DownloadLink'
import { IFilePackage } from './interfaces/FilePackage'
import { ILinkCollectingJob } from './interfaces/LinkCollectingJob'
import { ILinkQuery } from './interfaces/LinkQuery'
import { IPackageQuery } from './interfaces/PackageQuery'

import { JDownloaderCryptoSuite } from './jdownloader-crypto-suite'

export class JDownloaderClient extends JDownloaderCryptoSuite {
  constructor(
    email: string,
    password: string,
    appKey = 'jdownloader-api-indev',
    apiVer = 1
  ) {
    super({ email, password, appKey, apiVer })
  }

  /**
   * List links in the downloads section
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_143)
   * @param {string} deviceId The ID of the device
   */
  public async downloadsQueryLinks(
    deviceId: string,
    options: ILinkQuery = {}
  ): Promise<IDownloadLink[]> {
    const response = await this.callDevice('/downloadsV2/queryLinks', deviceId, options)
    return response.data
  }

  /**
   * List links in the link grabber section
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_267)
   * @param {string} deviceId The ID of the device
   */
  public async linkGrabberQueryLinks(
    deviceId: string,
    options: ICrawledLinkQuery = {}
  ): Promise<ICrawledLink[]> {
    const response = await this.callDevice('/linkgrabberv2/queryLinks', deviceId, options)
    return response.data
  }

  /**
   * Retrieves the direct connection information for a specific device.
   * @param deviceId The ID of the device.
   * @returns A Promise that resolves to an object containing the direct connection information.
   * 
   * [Official docs](https://my.jdownloader.org/developers/#tag_80)
   */
  public async getDirectConnectionInfos(
    deviceId: string
  ): Promise<IDirectConnectionInfos> {
    const response = await this.callDevice('/device/getDirectConnectionInfos', deviceId)
    return response.data
  }

  /**
   * Adds links to the Link Grabber
   *
   * [Official docs](https://my.jdownloader.org/developers/#tag_245)
   * @param deviceId The ID of the device
   */
  public async linkGrabberAddLinks(
    deviceId: string,
    options: IAddLinksQuery
  ): Promise<ILinkCollectingJob> {
    const response = await this.callDevice('/linkgrabberv2/addLinks', deviceId, { ...options, links: options.links.join(' ') })
    return response.data
  }

  /**
   * Queries the packages for downloads.
   *
   * @param deviceId - The ID of the device.
   * @param options - The query options.
   * @returns A promise that resolves to an array of file packages.
   * 
   * [Official docs](https://my.jdownloader.org/developers/#tag_146)
   */
  public async downloadsQueryPackages(
    deviceId: string,
    options: IPackageQuery = {}
  ): Promise<IFilePackage[]> {
    const response = await this.callDevice('/downloadsV2/queryPackages', deviceId, options)
    return response.data
  }
}
